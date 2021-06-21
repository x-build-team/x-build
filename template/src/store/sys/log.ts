import { defineStore } from 'pinia';
import { uniqueId } from 'lodash';
import { ElNotification } from 'element-plus';
import { INotificationOptions } from 'element-plus/lib/el-notification/src/notification.type.d';

interface ErrorLog {
  id: string;
  time: Date;
  error: Error;
}

export interface LogState {
  errorLogs: ErrorLog[];
}

export const useLogStore = defineStore({
  id: 'log',
  state: (): LogState => ({
    errorLogs: [],
  }),
  actions: {
    // 向 ErrorLogs 列表中加入新的日志信息，并记录时间
    addErrorLogs(payload: Error) {
      this.errorLogs.push({
        id: uniqueId('error'),
        time: new Date(),
        error: payload,
      });
    },
    // 清空 ErrorLogs
    clearErrorLogs() {
      this.errorLogs = [];
    },
    // 消息提示
    notification(payload: string | Error | INotificationOptions) {
      if (typeof payload === 'string') {
        ElNotification({
          type: 'success',
          message: payload,
        });
      } else if (typeof payload === 'object') {
        if (payload instanceof Error) {
          const { message } = payload;
          this.addErrorLogs(payload);
          ElNotification({
            type: 'error',
            message,
          });
        } else {
          ElNotification(payload);
        }
      }
    },
  },
});
