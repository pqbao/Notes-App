<template>
    <Form
        @submit="$emit('note-submit', noteLocal)"
        :validation-schema="schema"
    >
        <div class="form-group">
            <label for="title">Tiêu đề</label>
            <Field
                name="title"
                type="text"
                class="form-control"
                v-model="noteLocal.title"
            />
            <ErrorMessage name="title" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="content">Nội dung</label>
            <textarea
                name="content"
                class="form-control"
                rows="5"
                placeholder="Nhập nội dung ghi chú..."
                v-model="noteLocal.content"></textarea>
    
            <ErrorMessage name="content" class="error-feedback" />
        </div>
      
        <div v-if="note.id" class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button
                v-if="noteLocal.id"
                type="button"
                class="ml-2 btn btn-danger"
                @click="$emit('note-delete', noteLocal.id)"
            >
                Xóa
            </button>
        </div>
        <div v-else>
            <button class="btn btn-success col-md-12" type="submit" onclick="location.reload();">Add</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    name: "NoteForm",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["note-submit", "note-delete"],
    props: ["note"],
    data() {
        const schema = yup.object().shape({
            title: yup
                .string()
                .required("Tiêu đề phải có giá trị.")
                .min(2, "Tiêu đề phải ít nhất 2 ký tự.")
                .max(50, "Tiêu đề có nhiều nhất 30 ký tự."),
            content: yup
                .string()
                .max(200, "Nội dung tối đa 200 ký tự."),
        });
        
        return {
            noteLocal: this.note,
            schema,
        };
    },
};
</script>

<style>
@import "../assets/styles/main.css";
</style>