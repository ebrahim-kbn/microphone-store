import { GetStaticProps } from "next";
import Link from "next/link";
import { Microphone } from "../../model/Microphone";
import { openDB } from "../openDB";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const prefix = "/microphone-store";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export interface IndexProps {
  microphones: Microphone[];
}

const Index = ({ microphones }: IndexProps) => {
  //return <pre>{JSON.stringify(microphones, null, 4)} </pre>;
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      {microphones.map((microphone) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={microphone.id}>
          <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
            <a>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={microphone.brand + " " + microphone.model}
                    height="140"
                    image={prefix + microphone.imageUrl}
                    title={microphone.brand + " " + microphone.model}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {microphone.brand + " " + microphone.model}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                {/* <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions> */}
              </Card>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const currentPage = ctx.params?.currentPage as string;
  const currentPageNumber = +(currentPage || 0);
  const min = currentPageNumber * 5;
  const max = (currentPageNumber + 1) * 5;

  const db = await openDB();
  const microphones = await db.all(
    "SELECT * FROM Microphone where id > ? and id <= ?",
    [min, max]
  );

  return {
    props: { microphones },
  };
};
