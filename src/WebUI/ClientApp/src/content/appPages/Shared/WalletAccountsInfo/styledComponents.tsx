import { Avatar, Box, Card, styled } from "@mui/material";

export const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          color: ${theme.colors.primary.main};
  `
);

export const CardAddAction = styled(Card)(
  ({ theme }) => `
          border: ${theme.colors.primary.main} dashed 1px;
          color: ${theme.colors.primary.main};
          margin: ${theme.spacing(1)};

          
          .MuiCardActionArea-root {
            height: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
          }
          
          .MuiTouchRipple-root {
            opacity: .2;
          }
          
          &:hover {
            border-color: ${theme.colors.alpha.black[100]};
          }
  `
);

export const CardLogo = styled(Box)(
  ({ theme }) => `
        border: 1px solid ${theme.colors.alpha.black[30]};
        border-radius: ${theme.general.borderRadius};
        padding: ${theme.spacing(1)};
        margin: ${theme.spacing(2)};
        background: ${theme.colors.alpha.white[100]};
  `
);

export const CardCc = styled(Card)(
  ({ theme }) => `
       border: 1px solid ${theme.colors.alpha.black[30]};
       background: ${theme.colors.alpha.black[5]};
       box-shadow: none;
       margin: ${theme.spacing(1)};
  `
);
