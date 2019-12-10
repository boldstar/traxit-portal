import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

// No message specified.
extend('email', email);

// Override the default message.
extend('required', {
  ...required,
  message: 'Required'
});

extend('min', {
    message: `Minumum length 10 required`,
    validate(value, args) {
        if(  value.length >= args.length ) {
            return true
        }
        return
    },
    params: ['length']
});
extend('upper', {
    message: `Uppercase letter required`,
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[A-Z])");
        return strongRegex.test(value);
    }
});
extend('lower', {
    message: `Lowercase letter required`,
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])");
        return strongRegex.test(value);
    }
});
extend('number', {
    message: `Number required`,
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[0-9])");
        return strongRegex.test(value);
    }
});
extend('spec_char', {
    message: `Special character EX(! _ & ?) required`,
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[!@#\$%\^&\*])");
        return strongRegex.test(value);
    }
});