import thirdRequest from '@/utils/thirdRequest'
import request from '@/utils/request'

export function getTbShow() {
    return thirdRequest({
        url: '/han-api/tao?type=json',
        method: 'get'
    })
}

export function jx(data) {
    return request({
        url: '/bbs/jd/jComExchange',
        method: 'post',
        data: data

    })
}

export function sc(data) {
    return request({
        url: '/bbs/jd/jCommand',
        method: 'post',
        data: data

    })
}
