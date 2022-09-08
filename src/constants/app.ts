import { Lang } from "../interfaces/ui";

const date = new Date();

const DEF_UNTIL_DATE = new Date();
const DEF_FROM_DATE = new Date(date.getFullYear() - 1000, date.getMonth(), 1);

const TOPIC_SOURCES = [
  "TopPick Creators",
  "The Internet TESL Journal",
  "ESL Conversation Questions",
];

export const DEFAULT_IMAGE_URL =
  "https://icon-library.com/images/add-photo-icon/add-photo-icon-19.jpg";

export const CONSTANTS = {
  ALERT_SUCCESS_TIME: 3000,
  ALERT_ERROR_TIME: 8000,
  DRAWER_WIDTH: 220,
  SMALL_SCREEN: 800,
  DEFAULT_USER_TYPE: "creator",
  ROOT_LANG: Lang.EN,
  DEF_FROM_DATE,
  DEF_UNTIL_DATE,
  TOPIC_SOURCES,
};
