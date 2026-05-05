/**
 * This file is required by karma.conf.js and loads recursively all the .spec and framework files
 */

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

/**
 * Inicializa entorno de testing Angular
 */
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

/**
 * 🔥 IMPORTANTE: tu setup personalizado
 */
import './test-setup';