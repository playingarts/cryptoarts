import { FC } from "react";
import { useSize } from "../SizeProvider";
import ShadertoyReact from "shadertoy-react";
import frag from "../../Shaders/Xemantic/index.glsl";
import Card from "../Card";
import Button from "../Button";
import Link from "../Link";
import Text from "../Text";
import { breakpoints } from "../../source/enums";

const Shader = () => {
    return (
        <ShadertoyReact
            fs={frag}
            style={{
                zIndex: -1,
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "100%",
                height: 500
            }}
        />
    );
};

const CrazyAcesBanner: FC = () => {
    const { width } = useSize();

    return <div css={theme => [{
        gridColumn: "1 / -1",
        position: "relative",
        padding: "40px",
        overflow: "hidden",
        borderRadius: 10,
        marginBottom: 50,
        [theme.maxMQ.xsm]: {
            padding: 25
        }
    }]}>
        <Shader />
        <div css={theme => [{
            alignItems: "center",
            [theme.mq.md]: {
                display: "flex",

            }
        }]}>
            <div css={[{
                display: "flex",
                alignItems: "center",
                flex: 1
            }]}>

                <div css={[{zIndex:1}]}>
                    <Text css={theme => [{
                        fontSize: 30,
                        margin: 0,
                        marginBottom: 15,
                        width: 310,
                        [theme.maxMQ.xsm]: {
                            fontSize: 25,
                        }
                    }]}>Play before you shop</Text>
                    <Button component={Link} target="_blank" color="black" href={"https://play.playingarts.com/"}>Play Crazy Aces</Button>
                </div>
                <div css={theme => [{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    "> *": {
                        position: "absolute",
                        left: "50%",
                        [theme.mq.sm]: {

                            [theme.maxMQ.md]: {
                                left: "53%"
                            },
                        },
                        [theme.maxMQ.sm]: {
                            left: "63%"
                        },
                    },
                    [theme.maxMQ.xsm]: {
                        opacity: 0.2
                    }
                }]}>

                    <Card customSize noInfo card={{
                        img: "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/_backside-danny-ivan.jpg",
                    } as GQL.Card} css={[{
                        transform: "translateX(calc(-50% - 18px))",
                        "--width": `171px`,
                        "--height": `240px`,
                        rotate: "-8deg",
                        transformOrigin: "bottom left",
                        top: "-72px",
                    }]}></Card>
                    <Card customSize noInfo card={{
                        img: "https://s3.amazonaws.com/img.playingarts.com/two-big-hd/8-of-clubs-zutto.jpg",
                    } as GQL.Card} css={[{
                        transform: "translateX(calc(-50% + 18px))",
                        "--width": `171px`,
                        "--height": `240px`,
                        rotate: "8deg",
                        top: "-50px",
                        transformOrigin: "bottom right"
                    }]}></Card>
                    {width >= breakpoints.sm && width < breakpoints.md &&
                        <Card customSize noInfo card={{
                            img: "https://s3.amazonaws.com/img.playingarts.com/contest/retina/215.jpg",
                        } as GQL.Card} css={[{
                            transform: "translateX(calc(-50% + 54px))",
                            "--width": `171px`,
                            "--height": `240px`,
                            rotate: "20deg",
                            top: "-25px",
                            transformOrigin: "bottom right"
                        }]}></Card>}
                </div>
            </div>

            <Text css={theme => [{
                fontSize: 20,
                margin: 0,
                width: 310,
                textAlign: "right",
                [theme.maxMQ.md]: [{
                    textAlign: "left",
                    marginTop: 15,
                    [theme.maxMQ.xsm]: {
                        fontSize: 15,
                width: 230,

                    }
                }]
            }]}>
                A short game. A fair advantage.
                Win up to −15% on your order.
            </Text>
        </div>
    </div>
}
export default CrazyAcesBanner;