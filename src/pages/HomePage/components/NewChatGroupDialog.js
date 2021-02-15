import React from 'react'

import './NewChatGroupDialog.css'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook'
import GroupIcon from '@material-ui/icons/Group'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import EventIcon from '@material-ui/icons/Event'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { ThreeSixty } from '@material-ui/icons'

class RoomTheme extends React.Component {
    /* Re-usable room theme for different room types. */
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <ListItem>
                    <ListItemIcon>
                        {this.props.icon}
                    </ListItemIcon>
                    <ListItemText><strong>{this.props.label}:</strong> {this.props.desc}</ListItemText>
                </ListItem>
            </div>
        )
    }
}

class RoomThemeStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeRadioButtonName: "Kulüp"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            activeRadioButtonName: e.target.value
        })
        // Set the state of the parent component
        this.props.setGroupType(e.target.value)
    }

    getRoomLabelElement(roomtheme) {
        const mapping = {
            "Kulüp" : {
                icon: <GroupIcon></GroupIcon>,
                label: "Kulüp",
                desc: "Kulüp organizasyonları için bir oda."
            },
            "Ders" : {
                icon: <LaptopChromebookIcon></LaptopChromebookIcon>,
                label: "Ders",
                desc: "Dersle ilgili paylaşımlar için bir oda."
            },
            "Spor" : {
                icon: <SportsSoccerIcon></SportsSoccerIcon>,
                label: "Spor",
                desc: "Spor ile ilgili muhabbetler için bir oda."
            },
            "Gündem" : {
                icon: <EventIcon></EventIcon>,
                label: "Gündem",
                desc: "En yeni gelişmelerin tartılıştığı oda."
            },
        }
        const theme = mapping[roomtheme]
        return <RoomTheme label={theme.label} icon={theme.icon} desc={theme.desc} />
    }

    render() {
        return (
            <div>
                <h2>Grubuna bir tema bulalım</h2>
                <p>Grubun için aşağıdaki hazır temalardan birini seçebilirsin:</p>
                <RadioGroup id="group-type-selection" aria-label="Grup tipi" value={this.state.activeRadioButtonName} onChange={this.handleChange}>
                    <FormControlLabel value="Kulüp" control={<Radio />} label={this.getRoomLabelElement("Kulüp")} />
                    <FormControlLabel value="Ders" control={<Radio />} label={this.getRoomLabelElement("Ders")} />
                    <h3>Sosyal gruplar</h3>
                    <FormControlLabel value="Spor" control={<Radio />} label={this.getRoomLabelElement("Spor")}/> 
                    <FormControlLabel value="Gündem" control={<Radio />} label={this.getRoomLabelElement("Gündem")}/> 
                </RadioGroup>
                <br></br>
            </div>
        )
    }
}

class RoomNameStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            groupName: e.target.value
        })
        // Update the state of parent component
        this.props.setGroupName(e.target.value)
    }

    render() {
        return (
            <div style={{marginBottom: "20px"}}>
                <h2>Şimdi grubuna bir isim bulalım</h2>
                <p>Grubunun ismini aşağıya yazabilirsin:</p>
                <TextField label="Grup ismi" autoComplete="off" id="group-name-text-field" onChange={this.handleChange} /> 
                <br></br><br></br>
                <TextField label="Üniversite" helperText="Bu odaya sadece bu üniversitelilerden bağlantılar katılabilir." autoComplete="off" id="group-name-text-field" disabled value={this.props.universityOfUser} />
            </div>
        )
    }
}

class NewChatGroupFormStepper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeStep: 0,
            err: -1
        }

        this.steps = [
            'Grup temasını seç',
            'Gruba bir isim ver',
            'Bağlantılarını gruba ekle'
        ]
        
        this.handleBack = this.handleBack.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.checkNonEmptyGroupName = this.checkNonEmptyGroupName.bind(this)
    }
    
    getStepContent(step) {
        switch(step) {
            case 0:
                return <RoomThemeStep setGroupType={this.props.setGroupType} />
            case 1:
                return <RoomNameStep setGroupName={this.props.setGroupName} 
                                     universityOfUser={this.props.universityOfUser}
                                     checkNonEmptyGroupName={this.checkNonEmptyGroupName} 
                                     err={this.state.err === 1} />
            case 2:
                return <div></div>
        }
    }

    handleBack() {
        this.setState({
            activeStep: this.state.activeStep - 1
        })
    }

    checkNonEmptyGroupName(e) {
        // Check that the group name is not empty
        if (e.key === 'Enter') {
            const valid = e.target.value !== ''
            if (valid) {
                this.setState({
                    ...this.state,
                    activeStep: this.state.activeStep + 1
                })
            }
            else {
                // Set error on the group name (second) step (i.e. index 1)
                this.setState({
                    activeStep: this.state.activeStep,
                    err: 1
                })
            }
        }
        return
    }

    handleNext(e) {
        this.setState({
            ...this.state,
            activeStep: this.state.activeStep + 1
        })
    }

    render() {
        return (
            <div>
                <Stepper activeStep={this.state.activeStep}>
                    {this.steps.map((label, index) => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <div>
                    {this.state.activeStep === this.steps.length ? (
                        <div>
                            <Typography>Grup oluşturuldu!</Typography>
                        </div>
                    ) : (
                        <div>
                            <Typography>{this.getStepContent(this.state.activeStep)}</Typography>
                            <div>
                                <Button id="stepper-button" disabled={this.state.activeStep === 0} onClick={this.handleBack}>Geri</Button>
                                <Button id="stepper-button" variant="contained" color="primary" onClick={this.handleNext}>
                                    {this.state.activeStep === this.steps.length - 1 ? "Grup Oluştur" : "İleri"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        ) 
    }
}

class NewChatGroupDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: this.props.show,
            groupType: "Kulüp",
            groupName: null,
        }
        this.handleClose = this.handleClose.bind(this)
        this.setGroupType = this.setGroupType.bind(this)
        this.setGroupName = this.setGroupName.bind(this)
    }

    handleClose() {
        this.setState({
            show: false
        })
        this.props.setActiveTab('')
    }

    setGroupType(dataFromChild) {
        this.setState({
            ...this.state,
            groupType: dataFromChild
        })
    }

    setGroupName(dataFromChild) {
        this.setState({
            ...this.state,
            groupName: dataFromChild
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Dialog open={this.state.show} onClose={this.handleClose}>
                    <DialogTitle id="form-dialog-title">Yeni Grup Oluştur</DialogTitle>
                    <DialogContent>
                        <NewChatGroupFormStepper setGroupType={this.setGroupType} setGroupName={this.setGroupName} universityOfUser={this.props.universityOfUser} />
                    </DialogContent>
                    <IconButton onClick={this.handleClose} id="new-group-form-dialog-close-button">
                        <CloseIcon></CloseIcon>
                    </IconButton>
                </Dialog>
            </div>
        )
    }
}

export default NewChatGroupDialog