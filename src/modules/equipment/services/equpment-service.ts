import {
    OptionType, EquipmentsTable, OptionsMap, OptionGroupType, EquipmentsListView
} from "@/modules/equipment/domain/domain";

/**
 * Mock equipment service
 */
export class EquipmentsService {
    getEquipments(): Promise<EquipmentsTable[]> {
        const {equipmentsTable} = EquipmentsService;
        const result = equipmentsTable.map(eq => ({...eq}))
        return Promise.resolve(result)
    }

    addOrEditEquipment(eq: EquipmentsTable) {
        const {equipmentsTable} = EquipmentsService;
        const existIndex = equipmentsTable.findIndex(et => et.id === eq.id)
        const newEq = {
            ...eq,
            id: !isNaN(eq.id) ? eq.id : equipmentsTable.length + 1
        }
        if (existIndex > -1) {
            equipmentsTable.splice(existIndex, 1, newEq)
        } else {
            equipmentsTable.push(newEq)
        }
        return Promise.resolve({
            ...newEq
        })
    }

    getOptions(): Promise<OptionsMap[]> {
        return Promise.resolve(EquipmentsService.mapOptionsToOptionGroups(EquipmentsService.optionsTable.map(v => v)))
    }

    addOption(opt: Omit<OptionType, 'id'>) {
        const {optionsTable} = EquipmentsService;
        const nv = {
            name: opt.name,
            type: opt.type as any,
            value: opt.value,
            id: optionsTable.length + 1
        }
        optionsTable.push(nv)
        return Promise.resolve(nv);
    }

    private static optionsTable: Array<OptionType> = [
        {id: 1, name: 'engine', type: 'text', value: 'v6 3.5L'},
        {id: 2, name: 'engine', type: 'text', value: 'v4 2.5L'},
        {id: 3, name: 'finishing', type: 'text', value: 'Leather'},
        {id: 4, name: 'finishing', type: 'text', value: 'Carbon'},
        {id: 5, name: 'color', type: 'text', value: 'White'},
        {id: 6, name: 'color', type: 'text', value: 'Red'},
        {id: 7, name: 'discs', type: 'text', value: '15'},
        {id: 8, name: 'discs', type: 'text', value: '17'},
        {id: 9, name: 'discs', type: 'text', value: '18'},
        {id: 10, name: 'discs', type: 'text', value: '19'},
        {id: 11, name: 'discs', type: 'text', value: '20'},
        {id: 12, name: 'discs', type: 'text', value: '16'},
        {id: 13, name: 'air suspension', type: 'checkbox'},
        {id: 14, name: 'lettering on the hood', type: 'text', value: 'Some awesome text'},
        {id: 15, name: 'color', type: 'text', value: 'Green'},
        {id: 16, name: 'color', type: 'text', value: 'Gray'},
        {id: 17, name: 'engine', type: 'text', value: '4 horses'},
        {id: 18, name: 'finishing', type: 'text', value: 'Gold'},
        {id: 19, name: 'color', type: 'text', value: 'Gold'},
        {id: 20, name: 'discs', type: 'text', value: '120'},
        {id: 21, name: 'lettering on the hood', type: 'text', value: 'Hej Romale, hej Чавалэ'},
    ]
    private static equipmentsTable: EquipmentsTable[] = [
        {
            id: 1,
            name: 'Sport',
            selectedOptions: {
                engine: 1,
                finishing: 3,
                color: 5,
                'air suspension': 13,
                'lettering on the hood': 14,
            }
        },
        {
            id: 2,
            name: 'Prestige',
            selectedOptions: {
                engine: 2,
                finishing: 4,
                color: 6,
                'air suspension': 13,
            }
        },
        {
            id: 3,
            name: 'Standard',
            selectedOptions: {
                engine: 1,
                finishing: 4,
                color: 16,
            }
        },
        {
            id: 4,
            name: 'Comfort',
            selectedOptions: {
                engine: 1,
                finishing: 4,
                color: 15,
            }
        },
        {
            id: 5,
            name: 'Gypsy Style',
            selectedOptions: {
                engine:  17,
                finishing: 18,
                color: 19,
                discs: 20,
                'air suspension': 13,
                'lettering on the hood': 21,
            }
        },
    ]

    computeEquipmentsListView(equipments: EquipmentsTable[], options: OptionsMap[]): EquipmentsListView[] {
        return equipments.map(eq => {
            return {
                ...eq,
                selectedOptionsValues: options.map(group => {
                    const optionId = eq.selectedOptions[group.groupName];
                    return {
                        name: group.groupName,
                        type: group.groupType,
                        value: group.options
                            .filter(opt => opt.id === optionId)
                            .map(v => v.type === 'checkbox' ? 'true' : v.value)
                            .join(',')
                    }
                })
            }
        })
    }

    private static mapOptionsToOptionGroups(arr: OptionType[]): OptionsMap[] {
        return EquipmentsService.getOptionGroups(arr)
            .map((option) => {
                const {name: groupName, type: groupType} = option;
                const options = arr.filter(opt => (opt.name === groupName && opt.type === groupType))
                return {
                    groupName,
                    groupType,
                    options,
                };
            })
    }

    private static getOptionGroups(arr: OptionType[]) {
        return Array.from(new Set((arr || []).map(option => JSON.stringify({name: option.name, type: option.type}))))
            .map((group: string) => {
                return JSON.parse(group) as {
                    name: string,
                    type: OptionGroupType
                }
            })
    }
}

export type IEquipmentsService = EquipmentsService
