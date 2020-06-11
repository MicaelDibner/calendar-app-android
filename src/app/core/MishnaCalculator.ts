import { DateTime } from 'luxon';

import { Calendar, JewishCalendar } from 'kosher-zmanim';

/**
 * This class calculates the Daf Yomi Bavli page (daf) for a given date. To calculate Daf Yomi Yerushalmi
 * use the {@link YerushalmiMishnaCalculator}. The library may cover Mishna Yomi etc. at some point in the future.
 *
 * @author &copy; Bob Newell (original C code)
 * @author &copy; Eliyahu Hershfeld 2011 - 2019
 * @version 0.0.1
 */
export class MishnaCalculator {
  private static readonly mishnaStartDate: DateTime = DateTime.fromObject({
    year: 1947,
    month: Calendar.MAY + 1,
    day: 20,
  });

  private static readonly mishnaJulianStartDay: number = MishnaCalculator.getJulianDay(MishnaCalculator.mishnaStartDate);
  private static readonly shekalimChangeDate: DateTime = DateTime.fromObject({ year: 1975, month: Calendar.JUNE + 1, day: 24 });
  private static readonly shekalimJulianChangeDay: number = MishnaCalculator.getJulianDay(MishnaCalculator.shekalimChangeDate);

  /**
   * Returns the <a href="http://en.wikipedia.org/wiki/Daf_yomi">Daf Yomi</a> <a
   * href="http://en.wikipedia.org/wiki/Talmud">Bavli</a> {@link Daf} for a given date. The first Daf Yomi cycle
   * started on Rosh Hashana 5684 (September 11, 1923) and calculations prior to this date will result in an
   * IllegalArgumentException thrown. For historical calculations (supported by this method), it is important to note
   * that a change in length of the cycle was instituted starting in the eighth Daf Yomi cycle beginning on June 24,
   * 1975. The Daf Yomi Bavli cycle has a single masechta of the Talmud Yerushalmi - Shekalim as part of the cycle.
   * Unlike the Bavli where the number of daf per masechta was standardized since the original <a
   * href="http://en.wikipedia.org/wiki/Daniel_Bomberg">Bomberg Edition</a> published from 1520 - 1523, there is no
   * uniform page length in the Yerushalmi. The early cycles had the Yerushalmi Shekalim length of 13 days following the
   * <a href=
   * "https://he.wikipedia.org/wiki/%D7%93%D7%A4%D7%95%D7%A1_%D7%A1%D7%9C%D7%90%D7%95%D7%95%D7%99%D7%98%D7%90">Slavuta/Zhytomyr</a>
   * Shas used by <a href="http://en.wikipedia.org/wiki/Meir_Shapiro">Rabbi Meir Shapiro</a>. With the start of the eighth Daf Yomi
   * cycle beginning on June 24, 1975 the length of the Yerushalmi Shekalim was changed from 13 to 22 daf to follow
   * the <a href="https://en.wikipedia.org/wiki/Vilna_Edition_Shas">Vilna Shas</a> that is in common use today.
   *
   * @param calendar
   *            the calendar date for calculation
   * @return the {@link Daf}.
   *
   * @throws IllegalArgumentException
   *             if the date is prior to the September 11, 1923 start date of the first Daf Yomi cycle
   */
  public static getMishnaChapter(calendar: JewishCalendar): number {
    /*
     * The number of daf per masechta. Since the number of blatt in Shekalim changed on the 8th Daf Yomi cycle
     * beginning on June 24, 1975 from 13 to 22, the actual calculation for blattPerMasechta[4] will later be
     * adjusted based on the cycle.
     */

    const date: DateTime = calendar.getDate();
    const julianDay: number = this.getJulianDay(date);
    let cycleNo: number = 0;
    cycleNo = 1 + ((julianDay - MishnaCalculator.mishnaJulianStartDay) % 2096);

    // /* Fix Shekalim for old cycles. */
    // if (cycleNo <= 7) {
    //   blattPerMasechta[4] = 13;
    // } else {
    //   blattPerMasechta[4] = 22; // correct any change that may have been changed from a prior calculation
    // }
    // /* Finally find the daf. */
    // // eslint-disable-next-line no-restricted-syntax
    // for (const blattInMasechta of blattPerMasechta) {
    //   masechta++;
    //   total = total + blattInMasechta - 1;
    //   if (dafNo < total) {
    //     blatt = 1 + blattInMasechta - (total - dafNo);
    //     /* Fiddle with the weird ones near the end. */
    //     if (masechta === 36) {
    //       blatt += 21;
    //     } else if (masechta === 37) {
    //       blatt += 24;
    //     } else if (masechta === 38) {
    //       blatt += 32;
    //     }
    //     rambam = new Daf(masechta, blatt);
    //     break;
    //   }
    // }

    return cycleNo;
  }

  private static getJulianDay(date: DateTime): number {
    let { year, month } = date;
    const { day } = date;

    if (month <= 2) {
      year -= 1;
      month += 12;
    }

    const a: number = Math.trunc(year / 100);
    const b: number = 2 - a + Math.trunc(a / 4);
    return Math.trunc(Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + b - 1524.5);
  }
}