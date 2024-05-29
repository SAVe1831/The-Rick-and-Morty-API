<template>
  <main class="flex flex-column w-full">
    <h1 class="text-8xl text-center">The Rick and Morty API</h1>
    <div class="showcase flex flex-column">
      <div class="flex justify-content-center gap-3 mt-3">
          <div class="relative">
            <img class="absolute" style="width: 24px;" src="/images/search.png">
            <input @input="onChangeSearch($event)" class="h-2rem w-15rem pr-4 pl-2 border-none border-round-xl" type="text" placeholder="Поиск по имени...">
          </div>
      </div>  
      <div class="flex justify-content-center gap-3 mt-3">
        <select @change="onChangeSelect($event)" class="h-2rem w-17rem px-2 border-none border-round-xl">
          <option style="font-weight: bold;" value="" disabled selected>Поиск по статусу</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div class="flex justify-content-center">
        <button @click="getCharacter($event)" class="w-17rem h-3rem mt-3 border-none border-round-xl cursor-pointer hover:bg-white-alpha-80 active:bg-white-alpha-60">Применить</button>
      </div>    
      <div class="flex justify-content-center flex-wrap">
        <my-card 
          v-for="(character, index) in characters" 
          :key="index" 
          :character="character"
          :index="index"
          :episodeId="character.episode[0].split('/').pop()"
          ></my-card>
      </div>
      <div class="flex justify-content-center align-items-center my-3">
        <img src="/images/prev.png" alt="prev page" @click="PagePrev()" class="cursor-pointer">
        <div class="text-8xl text-white mx-8">{{ currentPage }}</div>
        <img src="/images/next.png" alt="next page" @click="PageNext()" class="cursor-pointer">
      </div>
    </div>
  </main>
</template>


<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';

const characters = ref([]);

const currentPage = ref(1);

const filters = reactive({
  searchQuery: '',
  filterByStatus: ''
});

const onChangeSearch = (event) => {
filters.searchQuery = event.target.value
}

const onChangeSelect = (event) => {
  filters.filterByStatus = event.target.value
}

const PageNext = () => {
  if (currentPage.value === 42) {
    currentPage.value = 1;
  } else {
    currentPage.value += 1;
  }
  getCharacterNewPage();
}

const PagePrev = () => {
  if (currentPage.value === 1) {
    currentPage.value = 42;
  } else {
    currentPage.value -= 1;
  }
  getCharacterNewPage();
}

const getCharacter = async () => {
  try {
    if (currentPage.value !== 1) {
      currentPage.value = 1      
    }
    const response = await axios.get(`https://rickandmortyapi.com/api/character/`, {
      params: {
        name: filters.searchQuery, 
        status: filters.filterByStatus,
        page: currentPage.value
      }
    });
    characters.value = response.data.results
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
      case 404:
        alert('Таких персонажей в списке нет');
      break;
      default:
        alert('Ошибка при выполнении запроса');
      break;
      }
    }
  } 
};
getCharacter()
const getCharacterNewPage = async () => {
  try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/`, {
      params: {
        name: filters.searchQuery, 
        status: filters.filterByStatus,
        page: currentPage.value
      }
    });
    characters.value = response.data.results;
  } catch (error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
      case 404:
        alert('Таких персонажей в списке нет');
      break;
      default:
        alert('Ошибка при выполнении запроса');
      break;
      }
    }
  } 
};
</script>


<style scoped>
.showcase {
  background-color: rgb(39, 43, 51);
}
img {
  top: 4px;
  right: 4px;
}
</style>
