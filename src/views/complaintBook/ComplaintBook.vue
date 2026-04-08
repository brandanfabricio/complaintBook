<template>
  <!-- Fondo gris -->
  <div class="bg-light min-vh-100 py-4">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8" lg="7">
          <CCard class="shadow-sm mt-3">
            <CCardHeader>
              <strong>
                Libro de Quejas, Agradecimientos, Sugerencias y Reclamos
              </strong>
              <p class="mb-0 mt-2">
                Completá el siguiente formulario para registrar tu reclamo.
              </p>
            </CCardHeader>

            <CCardBody>
              <CForm @submit.prevent="handleSubmit">
                <CRow>
                  <CCol md="6" class="mb-3">
                    <CFormLabel>Nombre y apellido *</CFormLabel>
                    <CFormInput v-model="form.name" />
                  </CCol>

                  <CCol md="6" class="mb-3">
                    <CFormLabel>Email *</CFormLabel>
                    <CFormInput type="email" v-model="form.email" />
                  </CCol>
                </CRow>

                <CRow>
                  <CCol md="6" class="mb-3">
                    <CFormLabel>DNI *</CFormLabel>
                    <CFormInput v-model="form.dni" />
                  </CCol>

                  <CCol md="6" class="mb-3">
                    <CFormLabel>Teléfono *</CFormLabel>
                    <CFormInput v-model="form.phone" />
                  </CCol>
                </CRow>

                <div class="mb-3">
                  <CFormLabel>Tipo de ingreso *</CFormLabel>
                  <CFormSelect
                    v-model="form.entryType"
                    :options="typeIngresoOptions"
                  >
                  </CFormSelect>
                </div>

                <div class="mb-3">
                  <CFormLabel>Motivo de reclamo *</CFormLabel>
                  <CFormSelect
                    v-model="form.category_id"
                    :options="categoriesOptions"
                  >
                  </CFormSelect>
                </div>

                <div class="mb-3">
                  <CFormLabel>Sucursal *</CFormLabel>
                  <CFormSelect
                    v-model="form.branch_id"
                    :options="branchesOptions"
                    :disabled="isBranchLocked"
                  >
                  </CFormSelect>
                </div>

                <div class="mb-3">
                  <CFormLabel>Descripción *</CFormLabel>
                  <CFormTextarea
                    v-model="form.description"
                    rows="4"
                    placeholder="Contanos brevemente qué ocurrió..."
                  />
                </div>

                <div class="mb-3">
                  <CFormLabel>Adjuntar archivo</CFormLabel>
                  <CFormInput type="file" @change="handleFile" />
                </div>

                <div class="d-flex justify-content-end">
                  <CButton type="submit" color="primary">
                    Enviar consulta
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const props = defineProps({
  codsuc: {
    type: String,
    default: "",
  },
});

const url = import.meta.env.VITE_BASE_URL;
const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  dni: "",
  phone: "",
  entryType: "queja",
  category_id: "",
  branch_id: "",
  description: "",
  files: null,
});

const typeIngresoOptions = [
  { value: "queja", label: "Libro de Quejas" },
  { value: "sugerencia", label: "Sugerencia" },
  { value: "agradecimiento", label: "Agradecimiento" },
  { value: "reclamo", label: "Reclamo" },
];

const branchesOptions = ref([]);
const branches = ref([]);
const categoriesOptions = ref([]);
const isBranchLocked = ref(false);

const handleFile = (e) => {
  form.files = e.target.files[0] || null;
};

const resetForm = () => {
  form.name = "";
  form.email = "";
  form.dni = "";
  form.phone = "";
  form.entryType = "queja";
  form.category_id = null;
  form.description = "";
  form.files = null;
};

const handleSubmit = async () => {
  if (
    !form.name ||
    !form.email ||
    !form.dni ||
    !form.phone ||
    !form.entryType ||
    !form.category_id ||
    !form.branch_id ||
    !form.description
  ) {
    await Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor completá todos los campos obligatorios.",
    });
    return;
  }
  let branch_id = branches.value.find(branch => branch.coddep == form.branch_id);
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("email", form.email);
  formData.append("dni", form.dni);
  formData.append("phone", form.phone);
  formData.append("entryType", form.entryType);
  formData.append("category_id", form.category_id);
  formData.append("branch_id", branch_id.id);
  formData.append("client_description", form.description);

  if (form.files) {
    formData.append("files", form.files);
  }

  try {
    const response = await fetch(
      `${url}/api/complaintBook/saveComplaint`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Error al guardar el reclamo.");
    }

    await Swal.fire({
      icon: "success",
      title: "Reclamo enviado",
      text: data.message || "Reclamo guardado correctamente.",
    });

    resetForm();
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "No se pudo enviar",
      text: error.message || "Error al guardar el reclamo.",
    });
  }
};

const loadFormData = async () => {
  try {
    const response = await fetch(
      `${url}/api/complaintBook/getFormData`
    );
    const data = await response.json();

    branches.value = data.branches;

    const matchedBranch = data.branches.find(
      (branch) => String(branch.coddep) === props.codsuc
    );

    if (props.codsuc && !matchedBranch) {
      router.replace("/404");
      return;
    }

    branchesOptions.value = data.branches.map((branch) => ({
      value: branch.coddep,
      label: branch.coddep + "-" + branch.name,
    }));

    let categories = data.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));

    categories.unshift({
      value: "",
      label: "-- Seleccione un motivo --",
    });
    categoriesOptions.value = categories;

    if (matchedBranch) {
      form.branch_id = matchedBranch.coddep;
      isBranchLocked.value = true;
    }
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(async () => {
  await loadFormData();
});
</script>


<style scoped>
.bg-light {
  background: linear-gradient(160deg, #BDBDBD 0%, #E0E0E0 100%);
}
</style>