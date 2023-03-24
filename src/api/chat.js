// 退出方法
import request from "@/utils/request";

export function groupMsgContent() {
    return request({
        url: '/bbs/group-msg-content/list',
        method: 'get'
    })
}


export function getOnlineUsers() {
    return request({
        url: '/bbs/chat/getOnlineUsers',
        method: 'post'
    })
}
