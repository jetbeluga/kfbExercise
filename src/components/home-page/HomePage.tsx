import type { VNode } from 'vue';
import { fetchTravelDate } from '@/api/services/travelDate/TravelDateService';
import { defineComponent, ref } from '@nuxtjs/composition-api';
import { useLocalization } from '@/utilities/localization/localization';

export default defineComponent({
  setup() {
    interface travelDate {
      departureDate: string;
      arrivalDate: string;
      price: string | number;
      description: string;
    }

    function formateDate(date: string) {
      return date?.split('-')?.reverse()?.join('.');
    }
    function formatePrice(price: any) {
      return `${(price / 100).toFixed(2)} Euro`;
    }
    function formateTravelData({
      departureDate,
      arrivalDate,
      price,
      description,
    }: travelDate) {
      const formatedDepartureDate = formateDate(departureDate);
      const formatedArrivalDate = formateDate(arrivalDate);
      const formatedPrice = formatePrice(price);
      return {
        departureDate: formatedDepartureDate,
        arrivalDate: formatedArrivalDate,
        price: formatedPrice,
        description,
      };
    }
    function formatSelectOption(date: travelDate) {
      const { departureDate, arrivalDate, price } = formateTravelData(date);
      return departureDate + ' - ' + arrivalDate + ' | ' + price;
    }
    const t = useLocalization().t;
    function getDate(daysInFuture?: number) {
      const today = new Date();
      const targetDate = daysInFuture
        ? today.setDate(today.getDate() + daysInFuture)
        : today;
      return Intl.DateTimeFormat().format(targetDate);
    }
    const defaultTravelDates = {
      departureDate: `${getDate()}`,
      arrivalDate: `${getDate(7)}`,
      price: 213133,
      description: '<p>Lorem ipsum</p>',
    };

    const allTravelDates = ref<travelDate[]>([defaultTravelDates]);
    const selectedData = ref<travelDate>(defaultTravelDates);

    async function getAllTravelDates() {
      return await fetchTravelDate();
    }
    async function setAllTravelDates() {
      const travelData = await getAllTravelDates();
      travelData
        ? (allTravelDates.value = travelData.alternativeTravelDates)
        : (allTravelDates.value = [defaultTravelDates]);
    }
    function setSelectedTravelDate(index: number) {
      const selectedElement = allTravelDates.value[index];
      if (selectedElement) {
        selectedData.value = formateTravelData(selectedElement);
      }
    }

    async function init() {
      await setAllTravelDates();
      setSelectedTravelDate(0);
    }

    init();

    return (): VNode => (
      <div class="HomePageComponent">
        <label class="HomePageComponent-label">
          {t('selectedTravelDate', 'homePage')}
        </label>
        <select
          class="HomePageComponent-select"
          id="selectDate"
          onChange={(event: any) => setSelectedTravelDate(event.target.value)}
        >
          {allTravelDates.value.map((date, index) => (
            <option key={index} value={index}>
              {formatSelectOption(date)}
            </option>
          ))}
        </select>
        <hr class="HomePageComponent-divider" />
        <div domPropsInnerHTML={selectedData?.value?.description} />
      </div>
    );
  },
});
