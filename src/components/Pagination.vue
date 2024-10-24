<template>
    <div class="pagination-container">
      <button
        class="btn btn-primary"
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
  
      <div class="pagination-box">
        <input
          type="number"
          v-model.number="inputPage"
          @keyup.enter="goToPage(inputPage)"
          :min="1"
          :max="totalPages"
          class="page-input"
        />
        <span>/ {{ totalPages }}</span>
      </div>
  
      <button
        class="btn btn-primary"
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  });
  
  const emit = defineEmits(["page-changed"]);
  const inputPage = ref(props.currentPage);
  
  watch(
    () => props.currentPage,
    (newVal) => {
      inputPage.value = newVal;
    }
  );
  
  const goToPage = (page) => {
    if (page >= 1 && page <= props.totalPages) {
      emit("page-changed", page);
    } else {
      inputPage.value = props.currentPage;
    }
  };
  
  const goToPreviousPage = () => {
    if (props.currentPage > 1) {
      emit("page-changed", props.currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (props.currentPage < props.totalPages) {
      emit("page-changed", props.currentPage + 1);
    }
  };
  
  
  </script>
  
  <style scoped>
  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  .pagination-box {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .page-input {
    width: 50px;
    text-align: center;
  }
  </style>