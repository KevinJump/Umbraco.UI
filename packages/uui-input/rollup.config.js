import { UUIProdConfig } from '../rollup-package.config';

export default UUIProdConfig({
  entryPoints: ['index', 'uui-input.element', 'uui-input.test'],
  bundles: ['index'],
});