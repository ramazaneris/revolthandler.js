const Colors = {
  yellow: "#FFFF00",
  "yellow-green": "#9ACD32",
  green: "#00FF00",
  "blue-green": "#0D98BA",
  blue: "#0000FF",
  "blue-violet": "#8A2BE2",
  violet: "#F800FF",
  "red-violet": "#C71585",
  red: "#FF0000",
  "red-orange": "#FF5349",
  orange: "#FFA500",
  "yellow-orange": "#FFAE42",
  white: "#FFFFFF",
  "light-gray": "#D3D3D3",
  gray: "#808080",
  "dark-gray": "#A9A9A9",
  black: "#000000",
  cyan: "#00FFFF",
  magenta: "#FF00FF",
  blurple: "#5865F2",
};

type ColorOptions = keyof typeof Colors | HexToString;

type HexToString = `#${string}`;

export declare class EmbedBuilder {
  icon_url?: string;
  url?: string;
  title?: string;
  description?: string;
  media?: string;
  color?: string;

  constructor(): this;
  /**
   *
   * @param icon_url must be an url
   */
  setIconUrl(icon_url: string): this;

  /**
   *
   * @param url must be an url
   */
  setUrl(url: string): this;

  /**
   *
   * @param title must be a string
   */
  setTitle(title: string): this;

  /**
   *
   * @param description must be a string
   */
  setDescription(description: string): this;

  /**
   *
   * @param media must be an id
   * @see Uploader
   */
  setMedia(media: any): this;

  /**
   *
   * @param color must be a string
   */
  setColour(color: ColorOptions): this;

  /**
   *
   * @param color must be a string
   */
  setColor(color: ColorOptions): this;

  /**
   *
   * return all embed contains
   */
  toJson(): this;
}
