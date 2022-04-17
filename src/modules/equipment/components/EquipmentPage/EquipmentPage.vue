<script lang="tsx">
    import {defineComponent} from 'vue'
    import {setup} from "./EquipmentPage";
    import {EquipmentsService} from "@/modules/equipment/services/equpment-service";

    export default defineComponent({
        extends: setup(new EquipmentsService())
    })
</script>
<style lang="scss" src="./EquipmentPage.scss"></style>
