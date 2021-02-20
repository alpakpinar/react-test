import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Autocomplete from '@material-ui/lab/Autocomplete'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import HomePageHeader from '../HomePage/components/HomePageHeader'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function CustomTextField(props) {
    /* (Slightly) customized text field component for reusability. */
    // Warning messages we'll use for errors
    const helperTexts = {
        "firstName": "Bu alan zorunludur.",
        "lastName": "Bu alan zorunludur.",
        "username": "Bu alan zorunludur.",
        "email": "Lütfen geçerli bir e-mail adresi girin.",
        "password": "Şifre en az 6 karakterden oluşmalıdır.",
    }

    // Regular view
    if (!props.error) {
        return (
            <Grid item xs={12} sm={props.small ? 6 : undefined}>
                <TextField
                    variant="outlined"
                    fullWidth
                    id={props.id}
                    label={props.label}
                    name={props.name}
                    type={props.password ? "password" : undefined}
                    autoComplete={props.autoComplete}
                    onChange={e => props.onChange(e.target.value)}
                />
            </Grid>
            )
    }
    // Error view
    else {
        return (
            <Grid item xs={12} sm={props.small ? 6 : undefined}>
                <TextField
                    error
                    helperText={helperTexts[props.name]}
                    variant="outlined"
                    fullWidth
                    id={props.id}
                    label={props.label}
                    name={props.name}
                    type={props.password ? "password" : undefined}
                    autoComplete={props.autoComplete}
                    onChange={e => props.onChange(e.target.value)}
                />
            </Grid>
            )
    }
}

function CustomAutocomplete(props) {
    /* University input field. */
    if (!props.error) {
        return (
            <Grid item xs={12}>
                <Autocomplete 
                    options={props.universities}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Üniversite" />}
                    onChange={(event,university) => props.setUniversity(university)}
                />
            </Grid>
        )
    }
    else {
        return (
            <Grid item xs={12}>
                <Autocomplete
                    options={props.universities}
                    renderInput={(params) => <TextField error helperText="Lütfen bir üniversite seçin." {...params} variant="outlined" label="Üniversite" />}
                    onChange={(event,university) => props.setUniversity(university)}
                />
            </Grid>
        )
    }
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textTransform: "none",
    fontSize: "18px"
  },
})

class NewRegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            success: false, // If user successfully signs in, redirect to the success page
            name: '', 
            surname: '', 
            username: '', 
            email: '', 
            university: '',
            formControl: false, // Checkbox at the end 
            errors: {
                'name' : false,
                'surname' : false,
                'email' : false,
                'password' : false,
                'username' : false,
                'university' : false,
                'formControl' : false,
            },
        }

        this.universities = ['Boğaziçi Üniversitesi', 'Koç Üniversitesi', 'Bilgi Üniversitesi']

        // Bind functions to component
        this.checkRemoveError = this.checkRemoveError.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
        this.setName = this.setName.bind(this)
        this.setSurname = this.setSurname.bind(this)
        this.setEmail = this.setEmail.bind(this)
        this.setUsername = this.setUsername.bind(this)
        this.setPassword = this.setPassword.bind(this)
        this.setUniversity = this.setUniversity.bind(this)

        this.validateName = this.validateName.bind(this)
        this.validateSurname = this.validateSurname.bind(this)
        this.validateUsername = this.validateUsername.bind(this)
        this.validateEmail = this.validateEmail.bind(this)
        this.validateUniversity = this.validateUniversity.bind(this)
        this.validateFormControl = this.validateFormControl.bind(this)
    }

    checkRemoveError(field, nowValid) {
        if (this.state.errors[field] && nowValid) {
            const currentErrors = this.state.errors
            currentErrors[field] = false
            this.setState({errors: currentErrors})
        }
    }

    // ======================
    // Setter functions
    // ======================
    setName(val) {
        this.setState({name: val})
        this.checkRemoveError("name", val !== '')
    }
    setSurname(val) {
        this.setState({surname: val})
        this.checkRemoveError("surname", val !== '')
    }
    setEmail(val) {
        this.setState({email: val})
        const nowValid = val.endsWith('edu.tr') && val.includes('@')
        this.checkRemoveError("email", nowValid)
    }
    setUsername(val) {
        this.setState({username: val})
        this.checkRemoveError("username", val !== '')
    }
    setPassword(val) {
        this.setState({password: val})
        const nowValid = val.length >= 6
        this.checkRemoveError("password", nowValid)
    }
    setUniversity(val) {
        this.setState({university: val})
        const nowValid = this.universities.includes(val)
        this.checkRemoveError("university", nowValid)
    }

    // ======================
    // Input validator functions
    // ======================
    validateName() {
        const valid = this.state.name.trim() !== ''
        if (!valid) {
            this.setState({errors: {...this.state.errors, 'name' : true}})
        }
    }
    validateSurname() {
        const valid = this.state.surname.trim() !== ''
        if (!valid) {
            this.setState({errors: {...this.state.errors, 'surname' : true}})
        }
    }
    validateUsername() {
        const valid = this.state.username.trim() !== ''
        if (!valid) {
            this.setState({errors: {...this.state.errors, 'username' : true}})
        }
    }
    validateEmail() {
        // Valid e-mail format: Ends with .edu.tr
        const valid = this.state.email ? this.state.email.endsWith('edu.tr') && this.state.email.includes('@') : false
        if (!valid) {
            this.setState({errors: {...this.state.errors, 'email' : true}})
        }
    }
    validatePassword() {
        const valid = this.state.password ? this.state.password.length >= 6 : false
        if (!valid) {
            this.setState({errors: {...this.state.errors, 'password': true}})
        }
        return valid
    }
    validateUniversity() {
        const valid = this.universities.includes(this.state.university)
        if (!valid) {
            this.setState({errors: {...this.state.errors, 'university': true}})
        }
    }

    validateFormControl() {
        if (!this.state.formControl) {
            this.setState({errors: {...this.state.errors, 'formControl' : true}})
        }
    }

    onSubmit(e) {
        e.preventDefault()
        
        // Validate input data
        this.validateFormControl()
        this.validateName()
        this.validateSurname()
        this.validateUsername()
        this.validateEmail()
        this.validatePassword()
        this.validateUniversity()
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <HomePageHeader />
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Kaydol
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <CustomTextField error={this.state.errors.name} small id="firstName" label="Isim" name="firstName" onChange={this.setName} />
                            <CustomTextField error={this.state.errors.surname} small id="lastName" label="Soyisim" name="lastName" onChange={this.setSurname} />
                            <CustomTextField error={this.state.errors.email} id="email" label="xxx@xxx.edu.tr" name="email" autoComplete="email" onChange={this.setEmail} />
                            <CustomTextField error={this.state.errors.username} id="username" label="Kullanıcı adı" name="username" autoComplete="username" onChange={this.setUsername} />
                            <CustomTextField error={this.state.errors.password} password id="password" label="Şifre" name="password" autoComplete="current-password" onChange={this.setPassword} />
                            
                            <CustomAutocomplete error={this.state.errors.university} universities={this.universities} setUniversity={this.setUniversity} />
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox required color="primary" />}
                                    label="Kullanıcı sözleşmesini okudum ve kabul ediyorum."
                                    onChange={e => this.setState({...this.state, formControl: !(this.state.formControl)})}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Kaydol
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                            <Link href="#" variant="body2">
                                Zaten bir hesabın var mı? Giriş yap
                            </Link>
                            </Grid>
                        </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </div>
            
          );
    }
}

export default withStyles(useStyles, { withTheme: true })(NewRegisterPage)