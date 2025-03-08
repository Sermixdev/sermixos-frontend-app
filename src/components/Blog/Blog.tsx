@@ .. @@
 import { RootState } from '../../store';
-import { fetchPosts, fetchPostById, clearCurrentPost } from '../../store/slices/postsSlice';
+import { clearCurrentPost } from '../../store/slices/postsSlice';
 import { Helmet } from 'react-helmet-async';
 import * as LucideIcons from 'lucide-react';
+import PostList from './PostList';
+import CreatePost from './CreatePost';
 
 const BlogContainer = styled.div`
   display: flex;
@@ .. @@
 
 const BlogContent = styled.div`
   display: flex;
-  flex: 1;
-  overflow: hidden;
+  flex-direction: column;
+  gap: 2rem;
+  padding: 1rem;
 `;
 
-const PostsList = styled.div`
-  width: 250px;
-  border-right: 1px solid #dfdfdf;
-  padding-right: 15px;
-  overflow-y: auto;
-  margin-right: 15px;
-`;
+const TabsContainer = styled.div`
+  display: flex;
+  gap: 1rem;
+  border-bottom: 1px solid #dfdfdf;
+  margin-bottom: 1rem;
+`
 
-const PostItem = styled.div<{ $isActive: boolean }>`
-  padding: 10px;
-  margin-bottom: 10px;
+const Tab = styled.button<{ $isActive: boolean }>`
+  padding: 0.5rem 1rem;
+  background: ${props => props.$isActive ? '#000080' : 'transparent'};
+  color: ${props => props.$isActive ? 'white' : '#000080'};
+  border: none;
   cursor: pointer;
-  background-color: ${(props) => (props.$isActive ? '#f0f0f0' : 'transparent')};
-  border: 1px solid ${(props) => (props.$isActive ? '#c0c0c0' : 'transparent')};
-  border-radius: 4px;
-  display: flex;
-  align-items: center;
-
-  &:hover {
-    background-color: ${(props) => (props.$isActive ? '#f0f0f0' : '#f0f0f0')};
-  }
-`;
-
-const PostTitle = styled.h3`
-  font-size: 16px;
-  margin: 0 0 5px 0;
-  color: #000080;
-`;
-
-const PostMeta = styled.div`
-  font-size: 12px;
-  color: #666;
-  display: flex;
-  align-items: center;
-`;
-
-const PostDate = styled.span`
-  margin-right: 10px;
-`;
-
-const PostTags = styled.div`
-  display: flex;
-  flex-wrap: wrap;
-  gap: 5px;
-  margin-top: 5px;
-`;
-
-const PostTag = styled.span`
-  font-size: 11px;
-  background-color: #e0e0e0;
-  padding: 2px 6px;
-  border-radius: 10px;
-  color: #666;
-`;
-
-const PostDetail = styled.div`
-  flex: 1;
-  overflow-y: auto;
-  padding-left: 15px;
-`;
-
-const PostDetailHeader = styled.div`
-  margin-bottom: 20px;
-`;
-
-const PostDetailTitle = styled.h2`
-  font-size: 22px;
-  margin: 0 0 10px 0;
-  color: #000080;
-`;
-
-const PostDetailMeta = styled.div`
-  font-size: 14px;
-  color: #666;
-  margin-bottom: 10px;
-`;
-
-const PostDetailImage = styled.img`
-  max-width: 100%;
-  height: auto;
-  margin-bottom: 20px;
-  border: 1px solid #dfdfdf;
-  border-radius: 4px;
-`;
-
-const PostDetailContent = styled.div`
-  font-size: 14px;
-  line-height: 1.6;
-
-  h2 {
-    font-size: 18px;
-    color: #000080;
-    margin: 20px 0 10px 0;
-  }
-
-  p {
-    margin-bottom: 15px;
-  }
-`;
-
-const LoadingIndicator = styled.div`
-  display: flex;
-  align-items: center;
-  justify-content: center;
-  height: 100%;
-  color: #666;
+  font-size: 1rem;
 `;
 
 const Blog: React.FC = () => {
-  const dispatch = useDispatch();
-  const { posts, currentPost, loading } = useSelector((state: RootState) => state.posts);
-
-  useEffect(() => {
-    dispatch(fetchPosts());
-    return () => {
-      dispatch(clearCurrentPost());
-    };
-  }, [dispatch]);
-
-  const handlePostClick = (id: string) => {
-    dispatch(fetchPostById(id));
-  };
-
-  const handleBackClick = () => {
-    dispatch(clearCurrentPost());
-  };
-
-  if (loading && posts.length === 0) {
-    return (
-      <LoadingIndicator>
-        <LucideIcons.Loader size={24} className="animate-spin" />
-        <span style={{ marginLeft: '10px' }}>Loading...</span>
-      </LoadingIndicator>
-    );
-  }
+  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');
 
   return (
     <BlogContainer>
       <Helmet>
         <title>Blog - RetroOS</title>
-        <meta name="description" content="Articles about AI, data, and automation" />
+        <meta name="description" content="Artículos sobre IA, datos y automatización" />
       </Helmet>
       
       <BlogHeader>
         <BlogTitle>Blog</BlogTitle>
-        <BlogDescription>Articles about AI, data, and automation</BlogDescription>
+        <BlogDescription>Artículos sobre IA, datos y automatización</BlogDescription>
       </BlogHeader>
 
       <BlogContent>
-        {!currentPost ? (
-          <PostsList>
-            {posts.map((post) => (
-              <PostItem
-                key={post.id}
-                $isActive={false}
-                onClick={() => handlePostClick(post.id)}
-              >
-                <PostTitle>{post.title}</PostTitle>
-                <PostMeta>
-                  <PostDate>{new Date(post.date).toLocaleDateString()}</PostDate>
-                  <span>by {post.author}</span>
-                </PostMeta>
-                <PostTags>
-                  {post.tags.map((tag, index) => (
-                    <PostTag key={index}>{tag}</PostTag>
-                  ))}
-                </PostTags>
-              </PostItem>
-            ))}
-          </PostsList>
-        ) : null}
-
-        <PostDetail>
-          {currentPost ? (
-            <>
-              <BackButton onClick={handleBackClick}>
-                <LucideIcons.ArrowLeft size={12} style={{ marginRight: '5px' }} />
-                Back to posts
-              </BackButton>
-              <PostDetailHeader>
-                <PostDetailTitle>{currentPost.title}</PostDetailTitle>
-                <PostDetailMeta>
-                  {new Date(currentPost.date).toLocaleDateString()} • by {currentPost.author}
-                </PostDetailMeta>
-                <PostTags>
-                  {currentPost.tags.map((tag, index) => (
-                    <PostTag key={index}>{tag}</PostTag>
-                  ))}
-                </PostTags>
-              </PostDetailHeader>
-              {currentPost.imageUrl && (
-                <PostDetailImage src={currentPost.imageUrl} alt={currentPost.title} />
-              )}
-              <PostDetailContent dangerouslySetInnerHTML={{ __html: currentPost.content }} />
-            </>
-          ) : (
-            <div>
-              <h2>Welcome to the Blog</h2>
-              <p>Select a post from the list to read it.</p>
-            </div>
-          )}
-        </PostDetail>
+        <TabsContainer>
+          <Tab
+            $isActive={activeTab === 'list'}
+            onClick={() => setActiveTab('list')}
+          >
+            Ver Posts
+          </Tab>
+          <Tab
+            $isActive={activeTab === 'create'}
+            onClick={() => setActiveTab('create')}
+          >
+            Crear Post
+          </Tab>
+        </TabsContainer>
+
+        {activeTab === 'list' ? <PostList /> : <CreatePost />}
       </BlogContent>
     </BlogContainer>
   );
 };