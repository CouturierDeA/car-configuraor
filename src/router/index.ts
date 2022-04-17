import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

export const setupRouter = function (
    BASE_URL: string,
) {
    const routes: Array<RouteRecordRaw> = [
        {
            path: '/',
            name: 'EquipmentPage',
            component: ()=> import(/* webpackChunkName: "EquipmentPage" */'@/modules/equipment/components/EquipmentPage/EquipmentPage.vue'),
        },
    ]

    return createRouter({
        history: createWebHistory(BASE_URL),
        routes
    })
}
