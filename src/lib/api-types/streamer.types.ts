export enum ServiceName {
  ADMIN = 'ADMIN',
  LEVELONE_EQUITIES = 'LEVELONE_EQUITIES',
  LEVELONE_OPTIONS = 'LEVELONE_OPTIONS',
  LEVELONE_FUTURES = 'LEVELONE_FUTURES',
  LEVELONE_FUTURES_OPTIONS = 'LEVELONE_FUTURES_OPTIONS',
  LEVELONE_FOREX = 'LEVELONE_FOREX',
  NYSE_BOOK = 'NYSE_BOOK',
  NASDAQ_BOOK = 'NASDAQ_BOOK',
  OPTIONS_BOOK = 'OPTIONS_BOOK',
  CHART_EQUITY = 'CHART_EQUITY',
  CHART_FUTURES = 'CHART_FUTURES',
  SCREENER_EQUITY = 'SCREENER_EQUITY',
  SCREENER_OPTION = 'SCREENER_OPTION',
  ACCT_ACTIVITY = 'ACCT_ACTIVITY',
}

export enum CommandName {
  LOGIN = 'LOGIN',
  SUBS = 'SUBS',
  ADD = 'ADD',
  UNSUBS = 'UNSUBS',
  VIEW = 'VIEW',
  LOGOUT = 'LOGOUT',
}

/**
 * The StreamerCommand interface represents a command sent to the Schwab Streamer API.
 */
export interface StreamerCommand {
  requestId: string;
  command: CommandName;
  service: ServiceName;
  SchwabClientCustomerId: string;
  SchwabClientCorrelId: string;
  parameters?: Record<string, any>;
}

/**
 * The StreamerResponse interface represents a response received from the Schwab Streamer API.
 */
export type StreamerResponse =
  StreamerResponseMessage | DataMessage | ResponseMessage;

export interface StreamerResponseMessage {
  response: ResponseMessage;
}

export interface StreamerNotifyMessage {
  notify: HeartBeatMessage[];
}

export interface DataMessage {
  service: StreamerServiceEnum; // TBD
  timestamp: number;
  command: StreamerCommandEnum;
  content: any;
}

export interface ResponseMessage {
  service: ServiceName;
  command: CommandName;
  SchwabClientCorrelId: string;
  timestamp: number;
  content: any;
}

export interface HeartBeatMessage {
  heartbeat: number; // UNIX timestamp, ms
}

/**
 * Enum representing the various streamer services and their descriptions.
 */
export enum StreamerServiceEnum {
  /**
   * Level 1 Equities - Change
   */
  LEVELONE_EQUITIES = 'LEVELONE_EQUITIES',

  /**
   * Level 1 Options - Change
   */
  LEVELONE_OPTIONS = 'LEVELONE_OPTIONS',

  /**
   * Level 1 Futures - Change
   */
  LEVELONE_FUTURES = 'LEVELONE_FUTURES',

  /**
   * Level 1 Futures Options - Change
   */
  LEVELONE_FUTURES_OPTIONS = 'LEVELONE_FUTURES_OPTIONS',

  /**
   * Level 1 Forex - Change
   */
  LEVELONE_FOREX = 'LEVELONE_FOREX',

  /**
   * Level Two book for Equities - Whole
   */
  NYSE_BOOK = 'NYSE_BOOK',

  /**
   * Level Two book for Equities - Whole
   */
  NASDAQ_BOOK = 'NASDAQ_BOOK',

  /**
   * Level Two book for Options - Whole
   */
  OPTIONS_BOOK = 'OPTIONS_BOOK',

  /**
   * Chart candle for Equities - All Sequence
   */
  CHART_EQUITY = 'CHART_EQUITY',

  /**
   * Chart candle for Futures - All Sequence
   */
  CHART_FUTURES = 'CHART_FUTURES',

  /**
   * Advances and Decliners for Equities - Whole
   */
  SCREENER_EQUITY = 'SCREENER_EQUITY',

  /**
   * Advances and Decliners for Options - Whole
   */
  SCREENER_OPTION = 'SCREENER_OPTION',

  /**
   * Get account activity information such as order fills, etc - All Sequence
   */
  ACCT_ACTIVITY = 'ACCT_ACTIVITY',
}

/**
 * Enum representing the various commands that can be sent to the Schwab Streamer API.
 */
export enum StreamerCommandEnum {
  /**
   * Login command to authenticate with the API.
   */
  LOGIN = 'LOGIN',

  /**
   * Subscribe to a service or data stream.
   */
  SUBS = 'SUBS',

  /**
   * Add additional subscriptions to an existing stream.
   */
  ADD = 'ADD',

  /**
   * Unsubscribe from a service or data stream.
   */
  UNSUBS = 'UNSUBS',

  /**
   * This changes the field subscription for a particular service.
   * It will apply to all symbols for that particular service.
   */
  VIEW = 'VIEW',

  /**
   * Logout command to terminate the session.
   */
  LOGOUT = 'LOGOUT',
}


