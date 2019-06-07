import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import CustomTabs from "../theme/CustomTabs";
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = {
  textCenter: {
    textAlign: "center"
  }
};

class Upload extends Component {
  
  render(){
    return (
      <Container>
        <CustomTabs
          headerColor="primary"
          tabs={[
            {
              tabName: "Upload Picture",
              tabIcon: "photo",
              tabContent: (
                <UploadImage {...this.props} />
              )
            },
            {
              tabName: "Fetch from URL",
              tabIcon: "link",
              tabContent: (
                <FetchUrl {...this.props} />
              )
            }
          ]}
        />
      </Container>
    );
  }
}

const UploadImage = (props) => {
  return (
    <div className='buttons fadein'>
      <div style={{ padding: 8 * 3 }}>
        <FontAwesomeIcon icon={faImage} color='#3B5998' size='10x' />
      </div>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        Upload a picture from your computer to set it as your meme template.
      </Typography>
      <input type='file' id='single' onChange={props.onChange} /> 
    </div>
)
}

const FetchUrl = (props) => {
  return (
    <form onSubmit={props.onChange}>
      <div style={{ padding: 8 * 3 }}>
        <FontAwesomeIcon icon={faLink} color='#3B5998' size='10x' />
      </div>
      <Typography component="div" style={{ padding: 8 * 3 }}>
        Add a direct URL to an image here to use as your meme template.
      </Typography>
      <input id="url" name="url" label="URL" type="text" />
      <input type="submit" value="Submit" />
    </form>
  )
}

// const TabElement = () => {
//   const [index, onChange] = useState(0);

//   function handleChange(event, newValue) {
//     setValue(newValue);
//   }

//   return (
//     <div>
//       <Tabs centered value={index} onChange={(e, val) => onChange(val)}>
//         <Tab label="Upload Image" disableRipple icon={<Icon>photo</Icon>} />
//         <Tab label="Fetch from URL" disableRipple icon={<Icon>link</Icon>} />
//       </Tabs>
//       {value === 0 && <TabContainer>Page One</TabContainer>}
//       {value === 1 && <TabContainer>Page Two</TabContainer>}
//     </div>
//   );
// }

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

export default withStyles(styles)(Upload);
