import { Box } from '@/src/components/atoms/Box';
import { SubHeader } from '@/src/components/organisms/Header';
import { SettingsChangePage } from '@/src/components/templates/SettingsChangePage';

export default function SettingsPage() {
  return (
    <Box
      position="relative"
      height="full"
      display="flex"
      flexDirection="column"
      minHeight="viewHeight"
      backgroundColor="backgroundElevatedPrimary"
    >
      <SubHeader text="설정" />
      <SettingsChangePage />
    </Box>
  );
}
