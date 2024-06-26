import { DefinitionValidator } from './core/definition-validator';
import { IconProvider } from './core/icon-provider';
import { I18n, StepsConfiguration, ValidatorConfiguration } from './designer-configuration';
import { PlaceholderController } from './designer-extension';
import { DesignerState } from './designer-state';
import { Services } from './services';
import { StepComponentFactory } from './workspace/step-component-factory';
import { StepExtensionResolver } from './workspace/step-extension-resolver';

export class ComponentContext {
	public static create(
		stepsConfiguration: StepsConfiguration,
		validatorConfiguration: ValidatorConfiguration | undefined,
		state: DesignerState,
		stepExtensionResolver: StepExtensionResolver,
		i18n: I18n,
		services: Services
	): ComponentContext {
		const validator = new DefinitionValidator(validatorConfiguration, state);
		const iconProvider = new IconProvider(stepsConfiguration);
		const placeholderController = services.placeholderController.create();
		const stepComponentFactory = new StepComponentFactory(stepExtensionResolver);
		return new ComponentContext(validator, iconProvider, placeholderController, stepComponentFactory, i18n, services);
	}

	private constructor(
		public readonly validator: DefinitionValidator,
		public readonly iconProvider: IconProvider,
		public readonly placeholderController: PlaceholderController,
		public readonly stepComponentFactory: StepComponentFactory,
		public readonly i18n: I18n,
		public readonly services: Services
	) {}
}
