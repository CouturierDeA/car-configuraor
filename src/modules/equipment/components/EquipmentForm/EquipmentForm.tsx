import {defineComponent, PropType} from "vue";
import {
    EquipmentsTable, OptionPayload,
    OptionsMap,
    OptionType,
} from "@/modules/equipment/domain/domain";
import {EquipmentOptionEditor} from "@/modules/equipment/components/EquipmentOptionEditor/EquipmentOptionEditor";

export const EquipmentForm = defineComponent(
    {
        props: {
            options: {
                type: Object as () => OptionsMap[],
                required: true
            },
            eq: {
                type: Object as () => EquipmentsTable,
                required: true
            },
            addOption: {
                type: Function as PropType<(opt: Omit<OptionType, 'id'>) => void>,
                required: true
            },
            onSubmit: {
                type: Function as PropType<(table: EquipmentsTable) => void>,
                required: true
            }
        },

        data() {
            return {
                addOptionMode: null as null | 'new' | 'edit',
                option: undefined as OptionPayload | undefined
            }
        },
        computed: {
            nameError() {
                return [
                    {
                        message: 'Name min length is 3',
                        invalid: this.eq.name.length < 3,
                    }
                ].find(err => err.invalid)?.message
            },
            formInvalid() {
                return [this.nameError].some(Boolean)
            }
        },
        methods: {
            editOption(opt: OptionsMap) {
                this.option = {
                    name: opt.groupName,
                    type: opt.groupType,
                    value: ''
                }
                this.addOptionMode = 'edit';
            },
            onSelectChange(e: Event, so: EquipmentsTable['selectedOptions'], groupName: string) {
                const value = (e.target as HTMLSelectElement).value
                so[groupName] = Number(value)
            },
            onCheckboxChange(e: Event, so: EquipmentsTable['selectedOptions'], groupName: string, options: OptionType[]) {
                const checked = (e.target as HTMLInputElement).checked
                if (checked) {
                    so[groupName] = options[0].id
                } else {
                    so[groupName] = undefined
                }
            },
            toggleAddOptionMode(mode: 'new' | 'edit' | null) {
                this.addOptionMode = mode
            }
        },
        render() {
            const {eq} = this;
            return <>
                {!this.addOptionMode && <div class="app-form">
                    <div class="app-form-item">
                        <div class="app-label">Equipment name</div>
                        <input class="app-input " v-model={eq.name} type="text"/>
                        {this.nameError && <div class="app-error">
                            {this.nameError}
                        </div>}
                    </div>

                    {this.options.map(opt => <div class="app-form-item">
                        <div class="app-label">{opt.groupName}</div>
                        {opt.groupType === 'text' && <div class="app-form-selection">
                            <select class="app-input " value={eq.selectedOptions[opt.groupName]}
                                    onChange={(e) => this.onSelectChange(e, eq.selectedOptions, opt.groupName)}>
                                {opt.options.map(opt2 => <option value={opt2.id}>{opt2.value}</option>)}
                            </select>
                            <button class="app-btn --text" onClick={() => this.editOption(opt)}>+</button>
                        </div>}
                        {opt.groupType === 'checkbox' && <div>
                            <input
                                type="checkbox"
                                checked={eq.selectedOptions[opt.groupName] === opt.options[0].id}
                                onChange={(e) => {
                                    this.onCheckboxChange(e, eq.selectedOptions, opt.groupName, opt.options)
                                }}/>
                        </div>}
                    </div>)}
                    <div class="app-form-controls --right">
                        <button class="app-form-control app-btn --outline-success"
                                type="button"
                                onClick={() => this.toggleAddOptionMode('new')}>
                            add new option
                        </button>
                        <button disabled={this.formInvalid} class="app-form-control app-btn --success"
                                type="button"
                                onClick={() => this.onSubmit(this.eq)}>
                            Submit
                        </button>
                    </div>
                </div>}
                {this.addOptionMode && <>
                    <EquipmentOptionEditor
                        option={this.option}
                        mode={this.addOptionMode}
                        onSubmit={(v) => {
                            this.addOption(v)
                            this.toggleAddOptionMode(null)
                            this.option = undefined
                        }}
                        onCancel={() => this.toggleAddOptionMode(null)}
                    />
                </>}
            </>
        }
    }
)

