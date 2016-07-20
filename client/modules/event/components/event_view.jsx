import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, FloatingActionButton, RaisedButton, CardText, List, ListItem} from 'material-ui';
import {HardwareKeyboardArrowLeft, HardwareKeyboardArrowRight, ActionList} from 'material-ui/svg-icons';
import keydown from 'react-keydown';
import moment from 'moment';
import {can_view_component} from '/lib/access_control';

class EventView extends React.Component {
  constructor(props) {
    super(props);
  }

  addParticipant() {
    this.props.event.participants.push(Meteor.userId())
    this.props.update(this.props.event)
  }

  removeParticipant() {
    this.props.event.participants.splice(this.props.event.participants.indexOf(Meteor.userId()), 1)
    this.props.update(this.props.event)
  }

  @keydown( 'right' )
  goToNext(){
    this.props.goTo("next", this.props.event);
  }

  @keydown( 'left' )
  goToPrevious(){
    this.props.goTo("previous", this.props.event);
  }

  render() {
    const {event, participants, cover} = this.props
    if (!event) {
        return <div></div>
    }

    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle subtitle={moment(event.date).format('D MMMM') + ', ' +
              moment(event.start).format('hh:mm') + ' - ' +
              moment(event.end).format('hh:mm')} />}
          >
            <img src={cover} />
          </CardMedia>
          <CardActions>
          {(()=>{
            if(event.participants.includes(Meteor.userId())){
              return(<RaisedButton secondary={true} label="Nahh, not for me, bro..." onTouchTap={this.removeParticipant.bind(this)}/>);
            }else{
              return(<RaisedButton primary={true} label="Sign me up for that shit!" onTouchTap={this.addParticipant.bind(this)}/>);
            }
          })()}
          </CardActions>
          <CardTitle
            title={event.title}
          />
          <CardText>
            {event.description}
          </CardText>
          <CardTitle
            subtitle="Participants"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText
            expandable={true}
          >
          <List>
            {(() => {
              return participants.map((user) => {
                return (
                  <ListItem key={user._id}
                    primaryText={user.profile.firstname + " " + user.profile.lastname}
                  />
                );
              })
            })()}
          </List>
          </CardText>
          <FloatingActionButton onTouchTap={this.goToPrevious.bind(this)}>
            <HardwareKeyboardArrowLeft />
          </FloatingActionButton>

          <FloatingActionButton linkButton={true} href="/events">
            <ActionList />
          </FloatingActionButton>

          <FloatingActionButton onTouchTap={this.goToNext.bind(this)}>
           <HardwareKeyboardArrowRight />
          </FloatingActionButton>

          {can_view_component('event.edit') ? <RaisedButton
            label="Edit"
            linkButton={true}
            href={event._id + "/edit"}
            primary={true}
          /> : null }
        </Card>
      </div>
    );
  }
}

export default EventView;
