import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';

const mockContent = [
    {
        name: "Schnitzel mit Spätzle",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat tristique nisl vitae aliquet. Suspendisse potenti. Mauris malesuada ac leo.",
        picture: "https://picsum.photos/200/300"
    },
    {
        name: "Kässpätzle",
        description: "Morbi eleifend magna at sollicitudin malesuada. Praesent rhoncus erat vel est sollicitudin ultricies. Nulla rhoncus, ligula id facilisis ultricies, leo.",
        picture: "https://picsum.photos/400/500"
    },
    {
        name: "Jägerschnitzel",
        description: "Sed aliquam rhoncus eros eu ultricies. Suspendisse nec finibus velit. Nunc pharetra felis a felis auctor, scelerisque scelerisque arcu rhoncus.",
        picture: "https://picsum.photos/300/500"
    },
    {
        name: "Fitnesssalad",
        description: "Sed porta nunc quis ligula lobortis volutpat. Pellentesque tempor elementum efficitur. Nullam ullamcorper scelerisque ligula, vel ultricies massa auctor a.",
        picture: "https://picsum.photos/400/300"
    },
    {
        name: "Strammer Max",
        description: "Aliquam odio tortor, pellentesque eu efficitur vitae, scelerisque in purus. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        picture: "https://picsum.photos/800/600"
    },
];

const useStyles = makeStyles(theme => ({
    cardContainer: {
      marginTop: theme.spacing(2)
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));

function Home() {
    const classes = useStyles();

    const cards = mockContent.map(gericht => {
        return <Grid item>
            <Card className={classes.root}>
                <CardHeader
                    title={gericht.name}
                />
                <CardMedia
                    className={classes.media}
                    image={gericht.picture}
                    title={gericht.name}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {gericht.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>;
    });

    return <Grid className={classes.cardContainer} container spacing={2} justify="center">
        {cards}
    </Grid>;
}

export default Home;