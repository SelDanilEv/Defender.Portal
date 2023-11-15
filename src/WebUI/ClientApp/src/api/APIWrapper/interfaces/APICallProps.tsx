interface APICallProps {
  url: string;
  options: any;
  utils?: any;
  onSuccess?: (response: any) => Promise<void>;
  onFailure?: (response: any) => Promise<void>;
  onFinal?: () => Promise<void>;
  showSuccess?: boolean;
  successMesage?: string;
  showError?: boolean;
  doLock?: boolean;
}

export default APICallProps;
