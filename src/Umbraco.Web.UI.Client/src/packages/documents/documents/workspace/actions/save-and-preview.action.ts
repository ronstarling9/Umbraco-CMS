import { UmbDocumentUserPermissionCondition } from '../../user-permissions/document/conditions/document-user-permission.condition.js';
import { UMB_DOCUMENT_WORKSPACE_CONTEXT } from '../document-workspace.context-token.js';
import { UMB_USER_PERMISSION_DOCUMENT_UPDATE } from '../../user-permissions/document/constants.js';
import type { UmbDocumentVariantModel } from '../../types.js';
import type UmbDocumentWorkspaceContext from '../document-workspace.context.js';
import { UmbWorkspaceActionBase } from '@umbraco-cms/backoffice/workspace';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbVariantId } from '@umbraco-cms/backoffice/variant';

// TODO: Investigate how additional preview environments can be supported. [LK:2024-05-16]
// https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api/additional-preview-environments-support
// In v13, they are registered on the server using `SendingContentNotification`, which is no longer available in v14.

export class UmbDocumentSaveAndPreviewWorkspaceAction extends UmbWorkspaceActionBase {
	#workspaceContext?: UmbDocumentWorkspaceContext;
	#variants: Array<UmbDocumentVariantModel> | undefined;
	#unique?: string | null;
	#userPermissionAllowed = false;

	constructor(host: UmbControllerHost, args: any) {
		super(host, args);

		/* The action is disabled by default because the onChange callback
		 will first be triggered when the condition is changed to permitted */
		this.disable();

		const condition = new UmbDocumentUserPermissionCondition(host, {
			host,
			config: {
				alias: 'Umb.Condition.UserPermission.Document',
				allOf: [UMB_USER_PERMISSION_DOCUMENT_UPDATE],
			},
			onChange: () => {
				this.#userPermissionAllowed = condition.permitted ?? false;
				this.#checkEnableState();
			},
		});

		this.consumeContext(UMB_DOCUMENT_WORKSPACE_CONTEXT, (context) => {
			this.#workspaceContext = context;
			this.#observeProperties();
		});
	}

	#observeProperties() {
		if (!this.#workspaceContext) return;

		// Observe unique (document ID)
		this.observe(
			this.#workspaceContext.unique,
			(unique) => {
				this.#unique = unique;
				this.#checkEnableState();
			},
			'saveAndPreviewUniqueObserver',
		);

		// Observe variants to check if document has a name
		this.observe(
			this.#workspaceContext.variants,
			(variants) => {
				this.#variants = variants;
				this.#checkEnableState();
			},
			'saveAndPreviewVariantsObserver',
		);
	}

	#checkEnableState() {
		// Check if all conditions are met for enabling the button
		const hasPermission = this.#userPermissionAllowed;
		const hasUnique = this.#unique !== undefined && this.#unique !== null;
		const hasName = this.#hasValidName();

		// Enable only if user has permission, document has a unique ID, and at least one variant has a name
		if (hasPermission && hasUnique && hasName) {
			this.enable();
		} else {
			this.disable();
		}
	}

	#hasValidName(): boolean {
		if (!this.#variants || this.#variants.length === 0) {
			return false;
		}

		// Check if at least one variant has a name
		return this.#variants.some((variant) => {
			return variant.name && variant.name.trim().length > 0;
		});
	}

	override async execute() {
		const workspaceContext = await this.getContext(UMB_DOCUMENT_WORKSPACE_CONTEXT);
		if (!workspaceContext) {
			throw new Error('Document workspace context not found');
		}
		workspaceContext.saveAndPreview();
	}
}

export { UmbDocumentSaveAndPreviewWorkspaceAction as api };
