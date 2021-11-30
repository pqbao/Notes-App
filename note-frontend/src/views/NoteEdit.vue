<template>
    <div v-if="note" class="edit-form">
        <h4> <a href="/"><i class="fas fa-arrow-circle-left"></i></a> 
            Cập Nhật Ghi Chú
        </h4>
            <NoteForm
                :note="note"
                @note-submit="updateNote"
                @note-delete="deleteNote"
            />
            <p>{{ message }}</p>
        </div>
        <div v-else>
            <br />
            <p>Ghi chú không tìm thấy.</p>
        </div>
</template>
<script>
import NoteService from "../services/note.service";
import NoteForm from "../components/NoteForm";

export default {
    name: "NoteEdit",
    components: {
        NoteForm,
    },
    data() {
        return {
            note: null,
            message: "",
        };
    },
    methods: {
        async getNote(id) {
            const [error, response] = await this.handle(NoteService.get(id));
            if (error) {
                console.log(error);
            } else {
                this.note = response.data;
                console.log(response.data);
            }
        },
        async updateNote(data) {
            const [error, response] = await this.handle(
                NoteService.update(this.note.id, data)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message = "Đã cập nhật ghi chú";
            }
        },
        async deleteNote() {
            const [error, response] = await this.handle(
                NoteService.delete(this.note.id)
            );
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.$router.push({ name: "NoteBook" });
            }
        },
    },
    mounted() {
        this.message = "";
        this.getNote(this.$route.params.id);
    },
};
</script>

<style>
.edit-form {
    max-width: 420px;
    margin: auto;
    padding: 0 10px;
    background-color: rgb(232, 247, 252);
    border-radius: 10px;
    padding-top:20px;
    border: 1px solid rgb(145, 194, 235);
}
</style>