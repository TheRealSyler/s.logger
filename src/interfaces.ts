import { Preset } from './presets';

export type LoggerWrapper = [string, string] | undefined | null;

/**
 * color/background work in node and the browser, the other properties only work in the browser.
 */
export type LoggerStyle =
  | string
  | {
      background?: string;
      color?: string;
      padding?: string;
      margin?: string;
      border?: string;
      /**
       * if true the style doesn't get reset in node.
       */
      removeResetColorCode?: boolean;
      [key: string]: boolean | string | undefined;
    };

export type LogType = string | number | null | undefined | object | any[];

export interface BrowserContext {
  styles: LoggerStyle[];
  index: number;
  offset: number;
}

export interface ConverterContext {
  isObject?: boolean;
  styled?: boolean;
  browserContext?: BrowserContext;
  indentation?: number;
  index?: number;
  typeStyles: LoggerTypeStyles;
}
export interface LoggerTypeStyles {
  /**
   * Style Applied to any number.
   */
  number: LoggerStyle;
  /**
   * Style Applied to any string inside of an array or object.
   */
  string: LoggerStyle;
  /**
   * Style Applied to the brackets of any array or object
   */
  bracket: LoggerStyle;
  /**
   * Style Applied to the key of any array or object
   */
  key: LoggerStyle;
  /**
   * Style Applied to the name (constructor) of any array or object
   */
  name: LoggerStyle;
  /**
   * Style Applied to null type.
   */
  null: LoggerStyle;
  /**
   * Style Applied to undefined type.
   */
  undefined: LoggerStyle;
  /**
   * Style Applied to empty arrays.
   */
  emptyArray: LoggerStyle;
}
export type ConverterOutput = { message: string; styled: boolean; nodeOnly?: boolean; wrap?: boolean };
export type Converter = (message: LogType, context: ConverterContext) => ConverterOutput;
export type Styler = (message: ConverterOutput | string, style: LoggerStyle, wrapper?: LoggerWrapper) => string;

export interface LoggerType {
  styles?: LoggerStyle[];
  wrappers?: LoggerWrapper[];
  preset?: Preset;
  /**
   * Used to change Messages before they get styled.
   */
  customHandler?: CustomHandler;
  enabled?: boolean;
  /**
   * Customize styles of arrays, objects, string etc.
   */
  typeStyles?: LoggerTypeStyles;
}
export type CustomHandlerData = {
  rawMessages: LogType[];
  wrappers: LoggerWrapper[];
  styles: LoggerStyle[];
  typeStyles: LoggerTypeStyles;
};
export type CustomHandler = (data: CustomHandlerData, converter: Converter, styler: Styler) => string;

export type PresetHandler<T> = (preset: T, data: CustomHandlerData) => string;
