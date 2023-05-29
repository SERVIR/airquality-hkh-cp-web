export function useControlledInterval(cb: Function) {
  const isPlaying = ref(false);
  let timer: number | null;

  const clear = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const play = (fps: number) => {
    timer = setInterval(cb, 1000 / fps);
    isPlaying.value = true;
  };

  const pause = () => {
    clear();
    isPlaying.value = false;
  };

  onScopeDispose?.(clear);

  return {
    isPlaying,
    play,
    pause,
  };
}
