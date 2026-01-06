import { Component, ErrorInfo, ReactNode } from "react";
import Grid from "../Grid";
import Text from "../Text";
import ArrowButton from "../Buttons/ArrowButton";
import { logger } from "../../source/lib/appLogger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("ErrorBoundary caught an error", error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Grid
          css={(theme) => ({
            minHeight: "50vh",
            alignItems: "center",
            justifyContent: "center",
            background: theme.colors.soft_gray,
            padding: "60px 0",
          })}
        >
          <div
            css={{
              gridColumn: "span 6",
              textAlign: "center",
            }}
          >
            <Text typography="newh3" css={{ marginBottom: 15 }}>
              Something went wrong
            </Text>
            <Text typography="paragraphSmall" css={{ marginBottom: 30, opacity: 0.7 }}>
              We encountered an unexpected error. Please try again.
            </Text>
            <ArrowButton color="accent" onClick={this.handleRetry}>
              Try again
            </ArrowButton>
          </div>
        </Grid>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
