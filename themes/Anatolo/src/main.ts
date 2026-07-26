// Stylesheets are emitted in import order; keep tokens → base → components.
import './scss/color-defination.scss';
import './scss/base.scss';
import './scss/animation.scss';
import './scss/highlight.scss';
import './scss/layout.scss';
import './scss/components/sidebar.scss';
import './scss/components/post.scss';
import './scss/components/listing.scss';
import './scss/components/toc.scss';
import './scss/components/overlay.scss';

import { Anatolo } from './anatolo/anatolo';
import { initAmbientBackground } from './anatolo/ambient-background';
import * as Utils from './utils/main';
import FloatBtn from './components/float-btn';
import './components/rightbtn';

(window as any).Anatolo = Anatolo;
(window as any).Utils = Utils;

initAmbientBackground();
new FloatBtn();
