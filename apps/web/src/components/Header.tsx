'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { IconButton } from './ui/IconButton';
import { headerHeight } from '@/constants/headerHeight';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  currentPage: string;
}

const StyledContainer = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: '20px 30px',
  height: headerHeight,
}));

export const Header = ({ currentPage }: HeaderProps) => {
  const router = useRouter();

  return (
    <StyledContainer direction="row">
      <Stack direction="row" alignItems="center" gap="20px">
        <IconButton onClick={() => router.push('/')} sx={{ p: 0 }}>
          <Image src="/logo.png" alt="logo" width={50} height={45} />
        </IconButton>
      </Stack>
      <Typography
        variant="h4"
        color="primary"
        fontFamily='"Jersey 20", cursive'
        fontWeight={400}
        textTransform="uppercase"
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {currentPage}
      </Typography>
    </StyledContainer>
  );
};
