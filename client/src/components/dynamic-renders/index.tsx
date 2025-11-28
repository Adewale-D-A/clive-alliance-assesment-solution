export default function dynamicRenderOptions() {
  return {
    Null: <></>,
  };
}

export type DynamicRenderOptionsType = keyof ReturnType<
  typeof dynamicRenderOptions
>;
