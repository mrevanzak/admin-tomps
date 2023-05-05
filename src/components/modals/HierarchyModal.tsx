import { Modal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Tree, { CustomNodeElementProps } from 'react-d3-tree';
import { ImSpinner2 } from 'react-icons/im';

import getHierarchy from '@/services/company/getHierarchy';

type HierarchyModalProps = {
  opened: boolean;
  close: () => void;
  companyId: string;
};

type RenderNodeProps = CustomNodeElementProps & {
  close: () => void;
  nodeDatum: CustomNodeElementProps['nodeDatum'] & {
    id?: string;
  };
};

function renderNode({ toggleNode, nodeDatum, close }: RenderNodeProps) {
  return (
    <g>
      <circle r='15' onClick={toggleNode} />
      <Link href={`/company/${nodeDatum.id}`} onClick={close}>
        <text fill='black' strokeWidth='1' x='20'>
          {nodeDatum.name}
        </text>
      </Link>
    </g>
  );
}

export default function HierarchyModal({
  opened,
  close,
  companyId,
}: HierarchyModalProps) {
  const { data, isLoading } = useQuery(
    ['hierarchy', companyId],
    () => getHierarchy(companyId),
    {
      enabled: opened,
    }
  );

  return (
    <Modal opened={opened} onClose={close} title='Hierarchy' centered size='xl'>
      <div className='flex h-96 items-center justify-center'>
        {isLoading ? (
          <ImSpinner2 className='animate-spin' />
        ) : (
          <Tree
            data={data}
            orientation='vertical'
            dimensions={{ width: 780, height: 384 }}
            translate={{ x: 390, y: 192 }}
            pathFunc='step'
            renderCustomNodeElement={(rd3tProps) =>
              renderNode({ ...rd3tProps, close })
            }
          />
        )}
      </div>
    </Modal>
  );
}
