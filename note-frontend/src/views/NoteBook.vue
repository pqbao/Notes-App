<template>
    <div class="list row">
        <div class="col-md-12">
            <div class="mb-3 input-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Nhập tên ghi chú cần tìm"
                    v-model="titleToSearch"
                />
                <div class="input-group-append">
                    <button
                        class="btn btn-outline-secondary"
                        type="button"
                        @click="searchTitle"
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6 add-form">
            <h4>Thêm Ghi Chú</h4>
            <NoteForm
                :note="note"
                @note-submit="createNote"
            />
            <p>{{ message }}</p>
        </div>

        <div class="col-md-6">
            <h4>Danh sách ghi chú <i class="far fa-sticky-note"></i></h4>
            <ul class="list-group">
                <li
                    class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(note, index) in notes"
                    :key="note.id"
                    @click="setActiveNote(note, index)"
                >
                    <b>{{ note.title }}</b> <br/>
                       {{ note.content }}  
            <!-- Chỉnh sửa ghi chú -->
                    <div class="col-md-2" v-if="currentNote">
                        <router-link :to="'/notes/' + currentNote.id">
                        <i class="fas fa-edit fa-2x" style="color: white;"></i></router-link>
                    </div>
                </li>
            </ul>

            <!--Nếu mà ko có ghi chú thì ko hiện nút xóa tất cả-->
            <button v-if="currentNote" class="mt-3 btn btn-sm btn-danger col-md-5" @click="removeAllNotes">
                Xóa tất cả
            </button>
        </div>
    </div>
</template>

<script>
import NoteService from "../services/note.service";
import NoteForm from "../components/NoteForm";

export default {
    name: "NoteBook",
    components: {
        NoteForm,
    },
    data() {
        return {
            note: {},
            message: "",
            notes: [],
            currentNote: null,
            currentIndex: -1,
            titleToSearch: "",
        };
    },
    methods: {
        async createNote(data) {
            const [error, response] = await this.handle(NoteService.create(data));
            if (error) {
                console.log(error);
            } else {
                console.log(response.data);
                this.message = "Ghi chú đã được thêm thành công.";
            }
        },
        setActiveNote(note, index) {
            this.currentNote = note;
            this.currentIndex = note ? index : -1;
    },
    async retrieveNotes() {
        const [error, response] = await this.handle(
            NoteService.getAll()
        );
        if (error) {
            console.log(error);
        } else {
            this.notes = response.data;
            console.log(response.data);
        }
    },
    refreshList() {
        this.retrieveNotes();
        this.currentNote = null;
        this.currentIndex = -1;
    },

    async removeAllNotes() {
        const [error, response] = await this.handle(
            NoteService.deleteAll()
        );
        if (error) {
            console.log(error);
        } else {
            console.log(response.data);
            this.refreshList();
        }
    },

    async searchTitle() {
        const [error, response] = await this.handle(
            NoteService.findByTitle(this.titleToSearch)
        );
        if (error) {
            console.log(error);
        } else {
            this.notes = response.data;
            this.setActiveNote(null);
            console.log(response.data);
            }
        },
    },
    mounted() {
        this.retrieveNotes();
    },
};

</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    padding-bottom: 20px;
}
.add-form {
    background-color: rgb(232, 247, 252);
    border-radius: 10px;
    padding-top:20px;
    border: 1px solid rgb(145, 194, 235);
    height: 100%;
}
button {
    border-radius: 20px;
}
.col-md-2 {
    float:right;
}
</style>