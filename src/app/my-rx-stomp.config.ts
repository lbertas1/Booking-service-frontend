import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

export const myRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  // brokerURL: 'ws://18.198.24.230/ws',
 brokerURL: 'ws://localhost:8090/ws',
 //  brokerURL: 'ws://First-CLB-322333755.eu-central-1.elb.amazonaws.com/ws',


  //brokerURL: 'ws://rabbitmq-broker:61613/ws',
  //brokerURL: 'ws://localhost:61613/ws',
  //brokerURL: 'ws://172.18.0.3:61613/ws',
  //brokerURL: 'ws://127.0.0.1:15674/ws',

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    login: 'web-socket-access-login',
    passcode: 'web-socket-access-password',
  },


  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  // heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds
   heartbeatOutgoing: 100000,

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  //reconnectDelay: 200,
  reconnectDelay: 10000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};
