// 退出方法
import request from "@/utils/request";

export function groupMsgContent() {
    return request({
        url: '/bbs/chat/groupMsgContent',
        method: 'post'
    })
}


export function getOnlineUsers() {
    return request({
        url: '/bbs/chat/getOnlineUsers',
        method: 'post'
    })
}
