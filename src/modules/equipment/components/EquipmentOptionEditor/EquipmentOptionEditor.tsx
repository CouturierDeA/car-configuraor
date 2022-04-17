import {defineComponent, PropType} from "vue";
import {
    OptionPayload
} from "@/modules/equipment/domain/domain";
import {EquipmentTextOptionEditor} from "@/modules/equipment/components/EquipmentOptionEditor/EquipmentTextOptionEditor";
import {EquipmentCheckboxOptionEditor} from "@/modules/equipment/components/EquipmentOptionEditor/EquipmentCheckboxOptionEditor";

export const EquipmentOptionEditor = defineComponent(
    {
        props: {
            mode: {
                type: String as PropType<'new' | 'edit'>,
                required: false
            },
            option: {
                type: Object as PropType<OptionPayload>,
                required: false
            },
            onSubmit: {
                type: Function as PropType<(table: OptionPayload) => void>,
                required: true
            },
            onCancel: {
                type: Function as PropType<() => void>,
                required: false
            }
        },
        computed: {
            equipmentTextOption() {
                return this.type === 'text'
            },
            equipmentCheckboxOption() {
                return this.type === 'checkbox'
            },
        },
        data(){
            return {
                type: this.option?.type
            }
        },
        render() {
            return <form>
                {this.mode === 'new' && <div class="app-form-item">
                    <div class="app-form-controls">
                        <div class="app-form-control">
                            <label>
                                <input class="app-form-radio" type="radio" value="checkbox"
                                       v-model={this.type}/>
                                Checkbox
                            </label>
                        </div>
                        <div class="app-form-control">
                            <label>
                                <input class="app-form-radio" type="radio" value="text"
                                       v-model={this.type}/>
                                Text
                            </label>
                        </div>
                    </div>
                </div>}
                <div class="app-form-item">
                    {this.equipmentCheckboxOption && <>
                        <EquipmentCheckboxOptionEditor
                            option={this.option}
                            mode={this.mode}
                            onSubmit={(v) => {
                                this.onSubmit(v)
                            }}
                            onCancel={() => this.onCancel && this.onCancel()}
                        />
                    </>}
                    {this.equipmentTextOption && <>
                        <EquipmentTextOptionEditor
                            option={this.option}
                            mode={this.mode}
                            onSubmit={(v) => {
                                this.onSubmit(v)
                            }}
                            onCancel={() => this.onCancel && this.onCancel()}
                        />
                    </>}
                </div>
            </form>
        }
    }
)

