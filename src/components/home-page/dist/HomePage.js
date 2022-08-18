exports.__esModule = true;
const TravelDateService_1 = require('@/api/services/travelDate/TravelDateService');
const composition_api_1 = require('@nuxtjs/composition-api');
const localization_1 = require('@/utilities/localization/localization');
const bem_1 = require('@/utilities/bem/bem');

TravelDateService_1.fetchTravelDate();
exports.default = composition_api_1.defineComponent({
  setup() {
    const today = 'today';
    const defaultDepartureDate = {
      departureDate: today,
      arrivalDate: `${today + 7}days`,
      price: 213133,
      description: 'Lorem ipsum',
    };
    const newLocal = localization_1.useLocalization();
    const alternativeTravelDates = composition_api_1.ref([
      defaultDepartureDate,
    ]);
    const selectedData = composition_api_1.ref();
    function getTravelData() {
      TravelDateService_1.fetchTravelDate().then((result) => {
        alternativeTravelDates.value = result.alternativeTravelDates;
      });
    }
    function setDefaultTravelData() {
      selectedData.value = defaultDepartureDate;
    }
    composition_api_1.onMounted(() => {
      setDefaultTravelData();
    });
    getTravelData();
    function formateDate(date) {
      return date === null || date === void 0
        ? void 0
        : date.split('-').reverse().join('-');
    }
    function formatePrice(price) {
      return (price / 100).toFixed(2);
    }

    function formateTravelData(_a) {
      const { departureDate } = _a;
      const { arrivalDate } = _a;
      const { price } = _a;
      const { description } = _a;
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
    function setSelectedTravelData(event) {
      let _a;
      const selectedIndex =
        (_a = event === null || event === void 0 ? void 0 : event.target) ===
          null || _a === void 0
          ? void 0
          : _a.value;
      const selectedElement = alternativeTravelDates.value[selectedIndex];
      if (selectedElement) {
        selectedData.value = formateTravelData(selectedElement);
      }
    }
    setSelectedTravelData(defaultDepartureDate);
    return function () {
      let _a;
      let _b;
      let _c;
      return React.createElement(
        'div',
        { class: 'travel-selector' },
        React.createElement(
          'label',
          { class: bem_1.bem('dateSelector', 'select') },
          newLocal.t('selectedTravelDate', 'homePage'),
        ),
        React.createElement(
          'select',
          {
            class: 'travelSelector__select',
            id: 'selectDate',
            onChange: setSelectedTravelData,
          },
          alternativeTravelDates.value.map((date, index) =>
            React.createElement(
              'option',
              { key: index, value: index },
              formateDate(date.departureDate),
            ),
          ),
        ),
        React.createElement(
          'div',
          null,
          React.createElement('p', null, 'arrivalDate'),
          React.createElement(
            'p',
            null,
            (_a =
              selectedData === null || selectedData === void 0
                ? void 0
                : selectedData.value) === null || _a === void 0
              ? void 0
              : _a.arrivalDate,
          ),
        ),
        React.createElement(
          'div',
          null,
          React.createElement('p', null, 'description'),
          React.createElement(
            'p',
            null,
            (_b =
              selectedData === null || selectedData === void 0
                ? void 0
                : selectedData.value) === null || _b === void 0
              ? void 0
              : _b.description,
          ),
        ),
        React.createElement(
          'div',
          null,
          React.createElement('p', null, 'price'),
          React.createElement(
            'p',
            null,
            (_c =
              selectedData === null || selectedData === void 0
                ? void 0
                : selectedData.value) === null || _c === void 0
              ? void 0
              : _c.price,
          ),
        ),
      );
    };
  },
});
