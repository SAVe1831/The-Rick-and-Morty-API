<template>
    <div class="flex characterCard border-round-lg m-3">
      <div class="characterCard__ImgWrapper">
          <img :src="character.image" alt="poster" class="character-img w-14rem h-14rem border-round-left-md">
      </div>
      <div class="characterCard__ContentWrapper flex flex-column justify-content-around p-3">
          <section>
              <h2 class="text-3xl m-0">{{ character.name }}</h2>
              <p class="m-0"><img :src="character.status === 'Alive' ? 'images/green.png' : (character.status === 'Dead' ? 'images/red.jpg' : 'images/gray.png')" style="width: 10px; height: 10px; border-radius: 50%;" alt="status"> {{ character.status }} - {{ character.species }}</p>
          </section>
          <section class="flex flex-column mt-2 mb-1">
              <p class="m-0 text-white-alpha-50">Last known location:</p>
              <p class="my-1 text-lg">{{ character.location.name }}</p>
          </section>
          <section v-if="episode">
              <p class="m-0 text-white-alpha-50">First seen in:</p>
              <p class="mt-1 mb-0 text-lg">{{ episode.name }}</p>
          </section>
      </div>
    </div>
</template>


<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
    character: Object,
    episodeId: String
});
const episode = ref(null);

const getEpisode = async (episodeId) => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
    episode.value = response.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса', error);
  } 
};
watch(() => props.episodeId, () => {
  if (props.episodeId && props.episodeId !== "") {
    getEpisode(props.episodeId);
  }
})
onMounted(() => {
  if (props.episodeId && props.episodeId !== "") {
    getEpisode(props.episodeId);
  }
});

</script>


<style scoped>
.characterCard {
    width: 600px;
    height: 14rem;
    background-color: rgb(60, 62, 68);
}
h2, p {
    color: white;
}
</style>