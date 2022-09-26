/*
 * @Author: Pan Jingyi
 * @Date: 2022-09-26 09:36:05
 * @LastEditTime: 2022-09-26 09:36:11
 */
declare namespace User {
  /**
   * 用户类型
   */
  interface UserType {
    username: string
    email?: string
    createTime?: date
    updateTime?: date
  }
}
