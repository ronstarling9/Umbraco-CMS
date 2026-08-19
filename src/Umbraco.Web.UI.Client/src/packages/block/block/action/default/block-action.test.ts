import { expect, fixture, html } from '@open-wc/testing';
import type { ManifestBlockActionDefaultKind } from './types.js';
import UmbBlockActionDefaultElement from './block-action.element.js';
import type { UUIButtonElement } from '@umbraco-cms/backoffice/external/uui';
import { type UmbTestRunnerWindow, defaultA11yConfig } from '@umbraco-cms/internal/test-utils';

const manifest: ManifestBlockActionDefaultKind = {
	type: 'blockAction',
	kind: 'default',
	alias: 'Test.BlockAction.Test',
	name: 'Test Action',
	meta: { icon: 'icon-edit', label: 'Test Action' },
};

describe('UmbBlockActionDefaultElement', () => {
	let element: UmbBlockActionDefaultElement;

	beforeEach(async () => {
		element = await fixture(html`<umb-block-action .manifest=${manifest}></umb-block-action>`);
	});

	it('is defined with its own instance', () => {
		expect(element).to.be.instanceOf(UmbBlockActionDefaultElement);
	});

	if ((window as UmbTestRunnerWindow).__UMBRACO_TEST_RUN_A11Y_TEST) {
		it('passes the a11y audit', async () => {
			await expect(element).to.be.accessible(defaultA11yConfig);
		});
	}

	describe('keyboard focus stacking', () => {
		it('raises its own z-index when focused, so its outline is not clipped by an adjacent action in the surrounding action bar', async () => {
			const button = element.shadowRoot!.querySelector<UUIButtonElement>('uui-button')!;
			await button.focus();

			expect(getComputedStyle(element).zIndex).to.equal('1');
		});
	});
});
