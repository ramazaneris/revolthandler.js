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

class EmbedBuilder {
  icon_url;
  url;
  title;
  description;
  media;
  colour;

  constructor() {
    return this;
  }

  setIconUrl(icon_url) {
    this.icon_url = icon_url;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setMedia(media) {
    this.media = media;
    return this;
  }

  setColour(color) {
    this.colour = Colors[color] || color;
    return this;
  }

  setColor(color) {
    this.colour = Colors[color] || color;
    return this;
  }

  toJson() {
    return this;
  }
}

module.exports = { EmbedBuilder };
