import test from '../models/test'
import MixedInputConsole from '../components/consoles/MixedInputConsole';
import { defaultParams } from "../paramSets/test"

export const testModel = {
  option: "TEST_MODEL",
  label: "test model",
  icon: null,
  generator: test,
  console: MixedInputConsole,
  params: defaultParams,
  default: true,
  checked: false,
};