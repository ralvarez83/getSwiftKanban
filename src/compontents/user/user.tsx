import React from 'react';
import IUser from "../../interfaces/i-user";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


interface IProps {
  user: IUser
}

export default function User (props: IProps){
 
  return (
    <Card>
      <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/images/cards/user.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.user.userData.loginId}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Usuario con el rol {props.user.userData.firstName}
          </Typography>
        </CardContent>
    </Card>
  );

}