import { getMonthDay, getDate, getTime, getDatetime, getMinutesInterval } from '../tool.js';

const createOffersTemplate = (offers) => {
  let offersToRender = offers.filter((offer) => offer.isActive);
  if (offersToRender.length === 0) { return ''; }

  const getListItemTemplate = (offer) => {
    const { title, price } = offer;
    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`;
  };

  offersToRender = offersToRender.map((offer) => getListItemTemplate(offer)).join('\n');

  return `<h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    ${offersToRender}
    </ul>`;
};

export const createTripEventsItemTemplate = (point) => {
  const { type, city, price, offers, time, isFavorite } = point;
  const beginDate = time.beginDate;
  const endDate = time.endDate;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${getDate(beginDate)}">${getMonthDay(beginDate)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDatetime(beginDate)}">${getTime(beginDate)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDatetime(endDate)}">${getTime(endDate)}</time>
        </p>
        <p class="event__duration">${getMinutesInterval(beginDate, endDate)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      ${createOffersTemplate(offers)}
      <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
