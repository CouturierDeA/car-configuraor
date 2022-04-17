export type OptionGroupType = 'text' | 'checkbox'
export type TextOptionType = {
    id: number,
    name: string,
    type: 'text',
    value: string
}
export type CheckboxOptionType = {
    id: number,
    name: string,
    type: 'checkbox',
    value?: boolean
}

export type OptionType = TextOptionType | CheckboxOptionType;

export type OptionPayload = Omit<OptionType, 'id'> & { id?: number }

export type EquipmentsTable = {
    id: number,
    name: string,
    selectedOptions: {
        [K: string]: number | undefined
    }
}

export interface EquipmentsListView extends EquipmentsTable {
    selectedOptionsValues: Array<{
        name: string,
        type: OptionGroupType,
        value: string,
    }> | undefined
}
export type OptionsMap = {
    groupName: string
    groupType: OptionGroupType
    options: Array<OptionType>
}
